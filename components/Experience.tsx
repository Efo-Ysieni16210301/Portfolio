import { ArrowUpRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import RichText from "@/components/RichText";

export default function Experience({ content }: { content: SiteContent }) {
  const { experience } = content;
  return (
    <section id="experience" className="section-shell experience-section">
      <div className="section-grid">
        <div className="section-aside">
          <span className="section-index">02 / EXPERIENCE</span>
          <span className="section-aside-note">The path that<br />shaped my work.</span>
        </div>
        <div className="section-content">
          <h2 className="section-title">{experience.title}</h2>
          <div className="timeline">
            {experience.entries.map((entry, index) => (
              <article key={entry.id} className="timeline-entry">
                <span className={`timeline-marker ${index === experience.entries.length - 1 ? "is-current" : ""}`} />
                <div className="timeline-heading">
                  <p className="timeline-period">{entry.range}</p>
                  {index === experience.entries.length - 1 && <span className="timeline-now">CURRENT</span>}
                </div>
                <h3>{entry.title}</h3>
                <p className="timeline-org">{entry.org}</p>
                <RichText html={entry.body} className="timeline-copy" />
              </article>
            ))}
          </div>
          <a className="text-link" href={content.hero.resumeUrl} download>View résumé <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
