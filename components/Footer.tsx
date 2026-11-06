import { ArrowUp, Heart } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export default function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="footer-brand" href="#top">{content.footer.brand}<span>.</span></a>
        <p>{content.footer.tagline}</p>
        <span className="footer-built">Designed with care <Heart size={13} /> · {new Date().getFullYear()}</span>
        <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUp size={17} /></a>
      </div>
    </footer>
  );
}
