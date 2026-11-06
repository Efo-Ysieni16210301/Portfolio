import { ArrowUpRight, Code2, ExternalLink, Layers3 } from "lucide-react";
import type { Project, SiteContent } from "@/lib/content";
import RichText from "@/components/RichText";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-card project-${project.visual} ${project.featured ? "project-featured" : ""}`}>
      <div className={`project-art ${project.imageUrl ? "has-project-image" : ""}`} style={project.imageUrl ? { backgroundImage: `linear-gradient(180deg,rgba(16,19,25,.03),rgba(16,19,25,.22)),url("${project.imageUrl.replace(/["\\]/g, "")}")` } : undefined}>
        {!project.imageUrl && (
          <>
            <div className="project-art-glow" />
            <div className="project-art-orbit project-art-orbit-a" />
            <div className="project-art-orbit project-art-orbit-b" />
            <div className="project-art-grid" />
            <span className="project-art-mark">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-art-cube"><Layers3 strokeWidth={1.1} /></div>
            <span className="project-art-caption">A closer look <ArrowUpRight size={14} /></span>
          </>
        )}
        {project.imageUrl && <span className="project-art-caption">A closer look <ArrowUpRight size={14} /></span>}
        {project.featured && <span className="project-featured-badge">FEATURED WORK</span>}
      </div>
      <div className="project-card-content">
        <div className="project-card-meta"><span>{project.category}</span><span className="project-number">{String(index + 1).padStart(2, "0")}</span></div>
        <h3>{project.title}</h3>
        <RichText html={project.description} className="project-description" />
        {project.note && <p className="project-note">{project.note}</p>}
        <div className="project-tags">
          {project.tech.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-links">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project <ExternalLink size={15} /></a>}
          {project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer"><Code2 size={15} /> Source code</a>}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ content }: { content: SiteContent }) {
  const projects = content.projects.items.filter((project) => project.visible);
  return (
    <section id="projects" className="projects-section">
      <div className="section-shell">
        <div className="section-grid">
          <div className="section-aside">
            <span className="section-index">03 / SELECTED WORK</span>
            <span className="section-aside-note">Made to solve<br />real problems.</span>
          </div>
          <div className="section-content">
            <div className="projects-heading">
              <div>
                <h2 className="section-title">{content.projects.title}</h2>
                <RichText html={content.projects.intro} className="section-lead" />
              </div>
              <span className="project-count"><Code2 size={17} /> {String(projects.length).padStart(2, "0")} projects</span>
            </div>
            {projects.length > 0 ? (
              <div className="projects-grid">
                {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
              </div>
            ) : (
              <div className="projects-empty">New work is on the way. Check back soon.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
