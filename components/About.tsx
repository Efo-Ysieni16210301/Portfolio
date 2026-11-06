import { ArrowUpRight, Check } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import RichText from "@/components/RichText";

export default function About({ content }: { content: SiteContent }) {
  const { about } = content;
  return (
    <section id="about" className="section-shell about-section">
      <div className="section-grid">
        <div className="section-aside">
          <span className="section-index">01 / ABOUT</span>
          <span className="section-aside-note">A little context<br />goes a long way.</span>
        </div>
        <div className="section-content">
          <h2 className="section-title">{about.title}</h2>
          <RichText html={about.intro} className="section-lead" />
          <div className="about-cards">
            <article className="about-card">
              <span className="about-card-index">BEFORE THE BROWSER</span>
              <p className="about-period">{about.pastPeriod}</p>
              <h3>{about.pastTitle}</h3>
              <ul>
                {about.pastItems.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 20)}`}><Check size={16} /><RichText html={item} /></li>
                ))}
              </ul>
            </article>
            <article className="about-card about-card-current">
              <span className="about-card-index">WHAT I BRING TODAY</span>
              <p className="about-period">A systems-first mindset</p>
              <h3>{about.currentTitle}</h3>
              <ul>
                {about.currentItems.map((item, index) => (
                  <li key={`${index}-${item.slice(0, 20)}`}><Check size={16} /><RichText html={item} /></li>
                ))}
              </ul>
            </article>
          </div>
          <a className="text-link about-link" href="#experience">More about my path <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}
