import { ArrowUpRight, Braces, Radio, Server, Wrench } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const icons = [Braces, Server, Wrench, Radio];

export default function Skills({ content }: { content: SiteContent }) {
  return (
    <section id="skills" className="section-shell skills-section">
      <div className="section-grid">
        <div className="section-aside">
          <span className="section-index">04 / TOOLKIT</span>
          <span className="section-aside-note">The tools behind<br />the outcomes.</span>
        </div>
        <div className="section-content">
          <h2 className="section-title">{content.skills.title}</h2>
          <p className="section-lead">A practical toolkit built by shipping real products and solving real-world infrastructure problems.</p>
          <div className="skills-grid">
            {content.skills.groups.map((group, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article className="skill-group" key={group.id}>
                  <div className="skill-group-heading">
                    <span className="skill-icon"><Icon size={18} /></span>
                    <h3>{group.label}</h3>
                    <span className="skill-group-index">0{index + 1}</span>
                  </div>
                  <div className="skill-tags">
                    {group.items.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              );
            })}
          </div>
          <a className="text-link" href="#contact">Let’s put them to work <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
