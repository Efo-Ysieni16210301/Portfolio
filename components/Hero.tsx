"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line px-6 pt-20 pb-28"
    >
      {/* traveling signal line, decorative */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-40"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
      >
        <path
          d="M -50 90 L 220 90 L 260 40 L 300 140 L 340 90 L 1050 90"
          fill="none"
          stroke="#33d6c8"
          strokeWidth="1.4"
          className="signal-path"
        />
        <path
          d="M -50 400 L 600 400 L 640 350 L 680 440 L 720 400 L 1050 400"
          fill="none"
          stroke="#ff6a3d"
          strokeWidth="1.2"
          className="signal-path"
          style={{ animationDuration: "32s", animationDirection: "reverse" }}
        />
      </svg>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center"
      >
        <div className="flex-1">
          <motion.p
            variants={item}
            className="font-mono text-sm text-data"
          >
            Addis Ababa, Ethiopia — open to freelance &amp; full-time work
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-balance mt-5 text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl"
          >
            Five years keeping networks online.
            <br />
            Now I build what runs on them.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted"
          >
            I&apos;m Getahun, a full-stack web developer working in React and
            Next.js. Before writing my first line of production code, I spent
            five years as a field network technician, so I build software
            that accounts for latency, failure, and real-world load — not
            just the happy path.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-medium text-base transition-transform hover:-translate-y-0.5"
            >
              See my work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/resume.pdf"
              download="Getahun_Guadie_Mamo_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-data hover:text-data"
            >
              Download résumé
              <Download className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="flex justify-center md:justify-end">
          <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-line sm:h-48 sm:w-48">
            <Image
              src="/avatar.jpg"
              alt="Portrait of Getahun Guadie Mamo"
              fill
              sizes="192px"
              className="object-cover grayscale contrast-110"
              priority
            />
            <div className="absolute inset-0 bg-signal/10" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
