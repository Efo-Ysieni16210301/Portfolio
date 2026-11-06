"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowUpRight, Eye, EyeOff, ExternalLink, FileText,
  LayoutDashboard, LogOut, Plus, Save, Trash2,
} from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import type { Project, SiteContent } from "@/lib/content";

type Panel = "overview" | "hero" | "about" | "experience" | "projects" | "skills" | "contact" | "site";
const panels: { id: Panel; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "hero", label: "Introduction" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
  { id: "site", label: "Site details" },
];

type ApiResponse = { content?: SiteContent; error?: string; ok?: boolean };

function Field({
  label, value, onChange, hint, type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

function RichField({
  label, value, onChange, hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="admin-field">
      <span>{label}</span>
      <RichTextEditor label={label} value={value} onChange={onChange} />
      {hint && <small>{hint}</small>}
    </div>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="admin-toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="admin-toggle-track" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`admin-card ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function newProject(): Project {
  return {
    id: crypto.randomUUID(),
    title: "New project",
    category: "Web application",
    description: "<p>What problem does this project solve?</p>",
    note: "",
    tech: [],
    liveUrl: "",
    sourceUrl: "",
    visible: false,
    featured: false,
    visual: "violet",
    imageUrl: "",
  };
}

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [panel, setPanel] = useState<Panel>("overview");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    void loadContent();
  }, []);

  async function loadContent() {
    setChecking(true);
    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      const result = (await response.json()) as ApiResponse;
      if (response.ok && result.content) {
        setContent(result.content);
        setSignedIn(true);
      } else if (response.status !== 401) {
        setError(result.error || "Could not load the content editor.");
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setChecking(false);
    }
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      setPassword("");
      await loadContent();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSignedIn(false);
    setContent(null);
    setPanel("overview");
  }

  async function save() {
    if (!content) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(result.error || "Could not save your changes.");
      setSaved(true);
      setMessage("Changes saved and published.");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not save your changes.");
    } finally {
      setBusy(false);
    }
  }

  function update(change: (draft: SiteContent) => void) {
    setContent((current) => {
      if (!current) return current;
      const next = structuredClone(current);
      change(next);
      return next;
    });
    setSaved(false);
    setMessage("");
  }

  if (checking) {
    return <main className="admin-shell"><p className="admin-loading">Opening your studio…</p></main>;
  }

  if (!signedIn || !content) {
    return (
      <main className="admin-shell admin-login-shell">
        <Link href="/" className="admin-back-link"><ArrowLeft size={16} /> Back to portfolio</Link>
        <form className="admin-login-card" onSubmit={signIn}>
          <div className="admin-mark"><LayoutDashboard size={22} /></div>
          <p className="admin-eyebrow">PRIVATE WORKSPACE</p>
          <h1>Your portfolio, your words.</h1>
          <p className="admin-login-copy">Sign in to update your story, publish projects, and keep everything current.</p>
          {error && <p className="admin-alert" role="alert">{error}</p>}
          <Field label="Username" value={username} onChange={setUsername} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
          <button className="admin-primary-button admin-login-button" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p className="admin-login-footnote">Private access · Your credentials are never stored in the browser.</p>
        </form>
      </main>
    );
  }

  const visibleProjects = content.projects.items.filter((project) => project.visible).length;

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <Link href="/" className="admin-brand"><span className="admin-brand-dot" /> Portfolio studio</Link>
        <div className="admin-top-actions">
          <span className={`admin-save-state ${saved ? "" : "is-unsaved"}`}>
            <span />{saved ? "All changes saved" : "Unsaved changes"}
          </span>
          <a href="/" target="_blank" rel="noreferrer" className="admin-preview-link">View site <ArrowUpRight size={15} /></a>
          <button type="button" className="admin-icon-button" onClick={signOut} aria-label="Sign out" title="Sign out"><LogOut size={17} /></button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p className="admin-eyebrow">WORKSPACE</p>
          <nav aria-label="Content sections">
            {panels.map(({ id, label }) => (
              <button key={id} type="button" className={panel === id ? "is-current" : ""} onClick={() => setPanel(id)}>
                {label}
                {id === "projects" && <span className="admin-nav-count">{content.projects.items.length}</span>}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-bottom">
            <span className="admin-avatar">{content.hero.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
            <span><strong>{content.hero.name}</strong><small>Portfolio owner</small></span>
          </div>
        </aside>

        <section className="admin-main">
          <div className="admin-content-heading">
            <div>
              <p className="admin-eyebrow">CONTENT MANAGER</p>
              <h1>{panels.find((item) => item.id === panel)?.label}</h1>
            </div>
            <button type="button" onClick={save} disabled={busy || saved} className="admin-primary-button">
              <Save size={16} />{busy ? "Saving…" : "Save changes"}
            </button>
          </div>

          {error && <p className="admin-alert" role="alert">{error}</p>}
          {message && <p className="admin-success" role="status">{message}</p>}

          {panel === "overview" && (
            <div className="admin-panel-content">
              <div className="admin-welcome-card">
                <div>
                  <p className="admin-eyebrow">YOUR DIGITAL FIRST IMPRESSION</p>
                  <h2>A good story gets better with every update.</h2>
                  <p>Keep your experience current, highlight the work you’re proud of, and make it easy for the right team to reach you.</p>
                </div>
                <div className="admin-welcome-orb" aria-hidden="true" />
              </div>
              <div className="admin-stat-grid">
                <div className="admin-stat"><span>Published projects</span><strong>{visibleProjects}<small> / {content.projects.items.length}</small></strong><p>Visible to visitors</p></div>
                <div className="admin-stat"><span>Content sections</span><strong>7</strong><p>Ready to edit</p></div>
                <div className="admin-stat"><span>Résumé</span><strong className="admin-stat-label">{content.hero.resumeUrl ? "Added" : "Not added"}</strong><p>Link from your introduction</p></div>
              </div>
              <Card title="Quick start">
                <div className="admin-quick-links">
                  <button type="button" onClick={() => setPanel("projects")}><Plus size={17} /><span><strong>Add a new project</strong><small>Show a recent win in your portfolio.</small></span><ArrowUpRight size={16} /></button>
                  <button type="button" onClick={() => setPanel("hero")}><FileText size={17} /><span><strong>Refresh your introduction</strong><small>Make your next role easy to picture.</small></span><ArrowUpRight size={16} /></button>
                  <button type="button" onClick={() => setPanel("contact")}><ExternalLink size={17} /><span><strong>Check your contact links</strong><small>Help recruiters get in touch.</small></span><ArrowUpRight size={16} /></button>
                </div>
              </Card>
            </div>
          )}

          {panel === "hero" && (
            <div className="admin-panel-content">
              <Card title="Your introduction">
                <div className="admin-fields-grid">
                  <Field label="Name" value={content.hero.name} onChange={(value) => update((draft) => { draft.hero.name = value; })} />
                  <Field label="Role / specialty" value={content.hero.role} onChange={(value) => update((draft) => { draft.hero.role = value; })} />
                  <Field label="Location" value={content.hero.location} onChange={(value) => update((draft) => { draft.hero.location = value; })} />
                  <Field label="Availability" value={content.hero.availability} onChange={(value) => update((draft) => { draft.hero.availability = value; })} />
                </div>
                <Field label="Headline" value={content.hero.headline} onChange={(value) => update((draft) => { draft.hero.headline = value; })} hint="Lead with the problems you solve and the value you bring." />
                <RichField label="Introduction" value={content.hero.intro} onChange={(value) => update((draft) => { draft.hero.intro = value; })} />
                <div className="admin-fields-grid">
                  <Field label="Résumé link" value={content.hero.resumeUrl} onChange={(value) => update((draft) => { draft.hero.resumeUrl = value; })} hint="Upload your PDF to public/ and enter its path, e.g. /resume.pdf." />
                  <Field label="Portrait image URL" value={content.hero.portraitUrl} onChange={(value) => update((draft) => { draft.hero.portraitUrl = value; })} hint="Use an image in public/ or a secure image URL." />
                </div>
              </Card>
            </div>
          )}

          {panel === "about" && (
            <div className="admin-panel-content">
              <Card title="Your story">
                <Field label="Section title" value={content.about.title} onChange={(value) => update((draft) => { draft.about.title = value; })} />
                <RichField label="Introduction" value={content.about.intro} onChange={(value) => update((draft) => { draft.about.intro = value; })} />
              </Card>
              {(["past", "current"] as const).map((period) => {
                const titleKey = period === "past" ? "pastTitle" : "currentTitle";
                const itemsKey = period === "past" ? "pastItems" : "currentItems";
                const list = content.about[itemsKey];
                return (
                  <Card key={period} title={period === "past" ? "Previous experience" : "What you do now"}>
                    <Field label="Heading" value={content.about[titleKey]} onChange={(value) => update((draft) => { draft.about[titleKey] = value; })} />
                    {period === "past" && <Field label="Period" value={content.about.pastPeriod} onChange={(value) => update((draft) => { draft.about.pastPeriod = value; })} />}
                    {list.map((item, index) => (
                      <div className="admin-list-item" key={`${period}-${index}`}>
                        <RichField label={`Highlight ${index + 1}`} value={item} onChange={(value) => update((draft) => { draft.about[itemsKey][index] = value; })} />
                        <button className="admin-danger-button" type="button" onClick={() => update((draft) => { draft.about[itemsKey].splice(index, 1); })} aria-label="Remove highlight"><Trash2 size={16} /></button>
                      </div>
                    ))}
                    <button className="admin-add-button" type="button" onClick={() => update((draft) => { draft.about[itemsKey].push("<p>New highlight</p>"); })}><Plus size={16} /> Add highlight</button>
                  </Card>
                );
              })}
            </div>
          )}

          {panel === "experience" && (
            <div className="admin-panel-content">
              <Card title="Experience section">
                <Field label="Section title" value={content.experience.title} onChange={(value) => update((draft) => { draft.experience.title = value; })} />
              </Card>
              {content.experience.entries.map((entry, index) => (
                <Card key={entry.id} title={`Position ${index + 1}`}>
                  <div className="admin-fields-grid">
                    <Field label="Position" value={entry.title} onChange={(value) => update((draft) => { draft.experience.entries[index].title = value; })} />
                    <Field label="Organization" value={entry.org} onChange={(value) => update((draft) => { draft.experience.entries[index].org = value; })} />
                    <Field label="Date or period" value={entry.range} onChange={(value) => update((draft) => { draft.experience.entries[index].range = value; })} />
                  </div>
                  <RichField label="Description" value={entry.body} onChange={(value) => update((draft) => { draft.experience.entries[index].body = value; })} />
                  <button className="admin-text-danger" type="button" onClick={() => update((draft) => { draft.experience.entries.splice(index, 1); })}><Trash2 size={15} /> Remove position</button>
                </Card>
              ))}
              <button className="admin-add-button" type="button" onClick={() => update((draft) => { draft.experience.entries.push({ id: crypto.randomUUID(), range: "2025 — Present", title: "New position", org: "Organization", body: "<p>Describe your impact and responsibilities.</p>" }); })}><Plus size={16} /> Add position</button>
            </div>
          )}

          {panel === "projects" && (
            <div className="admin-panel-content">
              <Card title="Projects section">
                <Field label="Section title" value={content.projects.title} onChange={(value) => update((draft) => { draft.projects.title = value; })} />
                <RichField label="Introduction" value={content.projects.intro} onChange={(value) => update((draft) => { draft.projects.intro = value; })} />
              </Card>
              <div className="admin-section-intro">
                <div><h2>Your projects</h2><p>Hidden projects stay saved here and won’t appear on your public site.</p></div>
                <button className="admin-primary-button" type="button" onClick={() => update((draft) => { draft.projects.items.unshift(newProject()); })}><Plus size={16} /> Add project</button>
              </div>
              {content.projects.items.map((project, index) => (
                <Card key={project.id} title={`${project.title || "Untitled project"}`}>
                  <div className="admin-project-toolbar">
                    <span className={`admin-project-status ${project.visible ? "is-visible" : ""}`}>{project.visible ? <Eye size={14} /> : <EyeOff size={14} />}{project.visible ? "Published" : "Hidden"}</span>
                    <div className="admin-project-actions">
                      <Toggle label={project.visible ? "Visible on site" : "Hidden from site"} checked={project.visible} onChange={(value) => update((draft) => { draft.projects.items[index].visible = value; })} />
                      <Toggle label="Featured" checked={project.featured} onChange={(value) => update((draft) => { draft.projects.items[index].featured = value; })} />
                      <button className="admin-danger-button" type="button" onClick={() => update((draft) => { draft.projects.items.splice(index, 1); })} aria-label={`Delete ${project.title}`}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="admin-fields-grid">
                    <Field label="Project name" value={project.title} onChange={(value) => update((draft) => { draft.projects.items[index].title = value; })} />
                    <Field label="Category" value={project.category} onChange={(value) => update((draft) => { draft.projects.items[index].category = value; })} />
                  </div>
                  <RichField label="Description" value={project.description} onChange={(value) => update((draft) => { draft.projects.items[index].description = value; })} />
                  <Field label="Extra note (optional)" value={project.note} onChange={(value) => update((draft) => { draft.projects.items[index].note = value; })} />
                  <div className="admin-fields-grid">
                    <Field label="Live project URL" value={project.liveUrl} onChange={(value) => update((draft) => { draft.projects.items[index].liveUrl = value; })} />
                    <Field label="Source code URL (optional)" value={project.sourceUrl} onChange={(value) => update((draft) => { draft.projects.items[index].sourceUrl = value; })} />
                    <Field label="Image URL (optional)" value={project.imageUrl} onChange={(value) => update((draft) => { draft.projects.items[index].imageUrl = value; })} />
                    <label className="admin-field"><span>Card color</span><select value={project.visual} onChange={(event) => update((draft) => { draft.projects.items[index].visual = event.target.value as Project["visual"]; })}><option value="violet">Violet</option><option value="mint">Mint</option><option value="amber">Amber</option></select></label>
                  </div>
                  <Field label="Technologies" value={project.tech.join(", ")} onChange={(value) => update((draft) => { draft.projects.items[index].tech = value.split(",").map((tag) => tag.trim()).filter(Boolean); })} hint="Separate each technology with a comma." />
                </Card>
              ))}
            </div>
          )}

          {panel === "skills" && (
            <div className="admin-panel-content">
              <Card title="Skills section">
                <Field label="Section title" value={content.skills.title} onChange={(value) => update((draft) => { draft.skills.title = value; })} />
              </Card>
              {content.skills.groups.map((group, index) => (
                <Card key={group.id} title={`Skill group ${index + 1}`}>
                  <div className="admin-fields-grid">
                    <Field label="Group name" value={group.label} onChange={(value) => update((draft) => { draft.skills.groups[index].label = value; })} />
                    <Field label="Skills" value={group.items.join(", ")} onChange={(value) => update((draft) => { draft.skills.groups[index].items = value.split(",").map((skill) => skill.trim()).filter(Boolean); })} hint="Separate each skill with a comma." />
                  </div>
                  <button className="admin-text-danger" type="button" onClick={() => update((draft) => { draft.skills.groups.splice(index, 1); })}><Trash2 size={15} /> Remove group</button>
                </Card>
              ))}
              <button className="admin-add-button" type="button" onClick={() => update((draft) => { draft.skills.groups.push({ id: crypto.randomUUID(), label: "New skill group", items: [] }); })}><Plus size={16} /> Add skill group</button>
            </div>
          )}

          {panel === "contact" && (
            <div className="admin-panel-content">
              <Card title="Contact section">
                <Field label="Section title" value={content.contact.title} onChange={(value) => update((draft) => { draft.contact.title = value; })} />
                <RichField label="Introduction" value={content.contact.intro} onChange={(value) => update((draft) => { draft.contact.intro = value; })} />
              </Card>
              {content.contact.methods.map((method, index) => (
                <Card key={method.id} title={method.label || `Contact method ${index + 1}`}>
                  <div className="admin-project-toolbar"><Toggle label={method.visible ? "Visible on site" : "Hidden from site"} checked={method.visible} onChange={(value) => update((draft) => { draft.contact.methods[index].visible = value; })} /><button className="admin-danger-button" type="button" onClick={() => update((draft) => { draft.contact.methods.splice(index, 1); })} aria-label="Delete contact method"><Trash2 size={16} /></button></div>
                  <div className="admin-fields-grid">
                    <Field label="Label" value={method.label} onChange={(value) => update((draft) => { draft.contact.methods[index].label = value; })} />
                    <Field label="Display text" value={method.value} onChange={(value) => update((draft) => { draft.contact.methods[index].value = value; })} />
                    <Field label="Link URL" value={method.href} onChange={(value) => update((draft) => { draft.contact.methods[index].href = value; })} />
                  </div>
                </Card>
              ))}
              <button className="admin-add-button" type="button" onClick={() => update((draft) => { draft.contact.methods.push({ id: crypto.randomUUID(), label: "New contact", value: "", href: "", visible: true }); })}><Plus size={16} /> Add contact method</button>
            </div>
          )}

          {panel === "site" && (
            <div className="admin-panel-content">
              <Card title="Site identity">
                <Field label="Site name" value={content.siteName} onChange={(value) => update((draft) => { draft.siteName = value; })} />
                <Field label="Footer name" value={content.footer.brand} onChange={(value) => update((draft) => { draft.footer.brand = value; })} />
                <Field label="Footer tagline" value={content.footer.tagline} onChange={(value) => update((draft) => { draft.footer.tagline = value; })} />
              </Card>
              <Card title="Navigation">
                <p className="admin-help-copy">The menu links are generated from your portfolio sections, so visitors can move between About, Experience, Projects, Skills, and Contact.</p>
                <a href="/" target="_blank" rel="noreferrer" className="admin-inline-link">Preview your site <ArrowUpRight size={15} /></a>
              </Card>
            </div>
          )}

          <footer className="admin-main-footer">
            <span>Changes are published when you save.</span>
            <button type="button" onClick={save} disabled={busy || saved} className="admin-primary-button"><Save size={16} /> Save changes</button>
          </footer>
        </section>
      </div>
    </main>
  );
}
