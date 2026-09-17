"use client";

import { ExternalLink } from "lucide-react";

type Project = {
  key: "imdb" | "instagram" | "search" | "typing" | "begena";
  name: string;
  url: string;
  description: string;
  tech: string[];
  accent: "signal" | "data";
};

const projects: Project[] = [
  {
    key: "imdb",
    name: "IMDb Clone",
    url: "https://imdb16210301.vercel.app/",
    description:
      "Movie discovery app with trending and top-rated feeds, live search, and dynamic detail pages, powered by a real-time third-party movie API.",
    tech: ["Next.js", "React", "REST API", "Dynamic routing"],
    accent: "signal",
  },
  {
    key: "instagram",
    name: "Instagram Clone",
    url: "https://instagram-16210301.vercel.app/",
    description:
      "Social feed UI with a sign-in flow, a messages page, saved posts, and a personalized suggestions feed.",
    tech: ["Next.js", "React", "Component architecture"],
    accent: "data",
  },
  {
    key: "search",
    name: "Google Search Clone",
    url: "https://google-clone16210301.vercel.app/",
    description:
      "A pixel-close recreation of Google's homepage and results experience — an exercise in layout precision.",
    tech: ["Next.js", "React", "CSS"],
    accent: "data",
  },
  {
    key: "typing",
    name: "Amharic Typing Speed Test",
    url: "https://typing-16210301.netlify.app/",
    description:
      "Typing trainer tracking WPM and accuracy live, with custom text sources and a score history exportable to CSV/JSON.",
    tech: ["JavaScript", "LocalStorage", "Data export"],
    accent: "signal",
  },
  {
    key: "begena",
    name: "Interactive Begena Simulator",
    url: "https://begenaupdate16210301.netlify.app/",
    description:
      "A playable Ethiopian ten-string harp in the browser — bilingual UI, multiple tunings, draggable strings, keyboard or on-screen control.",
    tech: ["JavaScript", "Web Audio API", "i18n"],
    accent: "data",
  },
];

function ProjectIcon({ type }: { type: Project["key"] }) {
  const common = { className: "h-6 w-6", strokeWidth: 1.6 };
  switch (type) {
    case "imdb":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18M8 5v4M8 15v4" />
          <path d="M11 13l4-2v6l-4-2z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...common}>
          <path d="M21 12a9 9 0 1 1-4-7.5" />
          <circle cx="17" cy="6" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20 20l-4.5-4.5" />
        </svg>
      );
    case "typing":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 10h.01M11 10h.01M15 10h.01M17 10h.01M7 14h8" />
        </svg>
      );
    case "begena":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...common}>
          <path d="M6 3v18M10 4v16M14 5v14M18 6v12" />
        </svg>
      );
  }
}

const borderHoverClass: Record<Project["accent"], string> = {
  signal: "hover:border-signal",
  data: "hover:border-data",
};

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const accentClass = project.accent === "signal" ? "text-signal" : "text-data";
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-colors ${borderHoverClass[project.accent]} ${
        featured ? "md:p-9" : ""
      }`}
    >
      <div>
        <div className={`inline-flex rounded-lg border border-line p-2.5 ${accentClass}`}>
          <ProjectIcon type={project.key} />
        </div>
        <h3
          className={`font-display mt-5 font-semibold text-ink ${
            featured ? "text-2xl" : "text-lg"
          }`}
        >
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono rounded-full border border-line px-2.5 py-1 text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium ${accentClass}`}
      >
        View live
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </a>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" className="border-b border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Things I&apos;ve shipped
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Five live projects, deployed and publicly reachable — not just
          repos. Click through to any of them.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <ProjectCard project={featured} featured />
          </div>
          {rest.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
