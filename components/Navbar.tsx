"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ content }: { content: SiteContent }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-inner" aria-label="Main navigation">
        <a href="#top" className="nav-brand">{content.hero.name.split(" ")[0]}<span>.</span></a>
        <ul className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}><a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a></li>
          ))}
          <li className="mobile-resume">
            <a href={content.hero.resumeUrl} download onClick={() => setMenuOpen(false)}>Résumé <Download size={15} /></a>
          </li>
        </ul>
        <a href={content.hero.resumeUrl} download className="nav-resume">Résumé <Download size={14} /></a>
        <button type="button" className="nav-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
}
