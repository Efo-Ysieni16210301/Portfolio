"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-base/90 border-line backdrop-blur"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-ink hover:text-signal transition-colors"
        >
          getahun<span className="text-signal">.</span>dev
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          download="Getahun_Guadie_Mamo_Resume.pdf"
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-signal hover:text-signal transition-colors"
        >
          Resume
          <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
      </nav>
    </header>
  );
}
