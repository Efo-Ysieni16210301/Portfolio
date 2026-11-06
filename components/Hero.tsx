"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import RichText from "@/components/RichText";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero({ content }: { content: SiteContent }) {
  const { hero } = content;
  return (
    <section id="top" className="hero-section">
      <div className="hero-grid-pattern" aria-hidden="true" />
      <motion.div variants={container} initial="hidden" animate="show" className="hero-layout">
        <div className="hero-copy">
          <motion.div variants={item} className="hero-status">
            <span className="status-pulse" />
            {hero.availability}
          </motion.div>

          <motion.p variants={item} className="hero-kicker">
            {hero.role}
          </motion.p>

          <motion.h1 variants={item} className="hero-title">
            {hero.headline}
          </motion.h1>

          <motion.div variants={item} className="hero-intro">
            <RichText html={hero.intro} />
          </motion.div>

          <motion.div variants={item} className="hero-meta">
            <MapPin size={16} aria-hidden="true" />
            <span>{hero.location}</span>
            <span className="meta-divider" />
            <span>Working worldwide</span>
          </motion.div>

          <motion.div variants={item} className="hero-actions">
            <a href="#projects" className="button-primary">
              Explore my work <ArrowUpRight size={17} />
            </a>
            <a href={hero.resumeUrl} download className="button-quiet">
              Download résumé <Download size={16} />
            </a>
          </motion.div>

          <motion.a variants={item} href="#about" className="hero-scroll">
            <span>Scroll to discover</span>
            <ArrowDown size={15} />
          </motion.a>
        </div>

        <motion.div variants={item} className="hero-art" aria-label={`Portrait of ${hero.name}`}>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="hero-orbit-dot" />
          <div className="hero-art-card">
            {hero.portraitUrl ? (
              <Image
                src={hero.portraitUrl}
                alt={`Portrait of ${hero.name}`}
                fill
                priority
                unoptimized
                sizes="(max-width: 760px) 220px, 360px"
                className="hero-portrait"
              />
            ) : (
              <div className="hero-portrait-fallback">{hero.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
            )}
            <div className="hero-art-overlay" />
            <div className="hero-art-caption">
              <span className="hero-caption-icon"><Sparkles size={14} /></span>
              <span><strong>{hero.name}</strong><small>Builder of useful things</small></span>
            </div>
          </div>
          <div className="hero-float-card hero-float-location">
            <span className="float-icon"><MapPin size={15} /></span>
            <span><strong>{hero.location}</strong><small>Available globally</small></span>
          </div>
          <div className="hero-float-card hero-float-years">
            <strong>5<span>+</span></strong>
            <small>years in the field</small>
          </div>
          <span className="hero-art-label">BUILD WITH INTENTION · SHIP WITH CARE</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
