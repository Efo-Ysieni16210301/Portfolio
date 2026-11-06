import { ArrowUpRight, Code2, Link2, Mail, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import RichText from "@/components/RichText";

const contactIcons = { email: Mail, phone: Phone, linkedin: Link2, github: Code2 };

export default function Contact({ content }: { content: SiteContent }) {
  const methods = content.contact.methods.filter((method) => method.visible);
  return (
    <section id="contact" className="contact-section">
      <div className="contact-orb contact-orb-one" aria-hidden="true" />
      <div className="contact-orb contact-orb-two" aria-hidden="true" />
      <div className="contact-inner">
        <span className="section-index">05 / SAY HELLO</span>
        <div className="contact-layout">
          <div>
            <div className="contact-icon"><MessageCircle size={20} /></div>
            <h2>{content.contact.title}</h2>
            <RichText html={content.contact.intro} className="contact-copy" />
          </div>
          <div className="contact-methods">
            {methods.map((method) => {
              const Icon = contactIcons[method.id as keyof typeof contactIcons] || ArrowUpRight;
              return (
                <a key={method.id} href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel={method.href.startsWith("http") ? "noreferrer" : undefined} className="contact-method">
                  <span className="contact-method-icon"><Icon size={18} /></span>
                  <span><small>{method.label}</small><strong>{method.value}</strong></span>
                  <ArrowUpRight size={16} className="contact-method-arrow" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
