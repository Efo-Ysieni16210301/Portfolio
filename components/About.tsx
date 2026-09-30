const then = [
  "Installed and repaired fiber, routers, and wireless links across live sites",
  "Diagnosed faults under time pressure using network monitoring tools",
  "Kept backup power — generators, UPS, battery banks — running through outages",
  "Documented infrastructure plans to a compliance standard",
];

const now = [
  "Build responsive, accessible interfaces with React, Next.js, and TypeScript",
  "Build real backends: MongoDB, Firebase Auth & Firestore, REST APIs",
  "Integrated live payment processing (Chapa) into a full e-commerce platform",
  "Debug with the same patience I used tracing a fault to one bad splice",
];

export default function About() {
  return (
    <section id="about" className="border-b border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold text-ink">
          What changed, and what didn&apos;t
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          I have a BSc in Electrical and Computer Engineering from Woldia
          University, and spent five years as a Field Operations Technician
          at Ethio Telecom. The tools changed when I moved into web
          development. The way I work — methodical, comfortable under
          pressure, obsessive about reliability — didn&apos;t.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          <div className="bg-surface p-8">
            <p className="font-mono text-sm text-muted">2020 – 2026</p>
            <h3 className="font-display mt-2 text-xl font-semibold text-ink">
              Field Operations Technician
            </h3>
            <ul className="mt-6 space-y-3">
              {then.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface p-8">
            <p className="font-mono text-sm text-signal">Now</p>
            <h3 className="font-display mt-2 text-xl font-semibold text-ink">
              Full-Stack Developer
            </h3>
            <ul className="mt-6 space-y-3">
              {now.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink/90">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
