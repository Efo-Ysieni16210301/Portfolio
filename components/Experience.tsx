const timeline = [
  {
    range: "Nov 2020 — May 2026",
    title: "Field Operations Technician",
    org: "Ethio Telecom, Gondar",
    body: "Installed, maintained, and troubleshot power systems and network infrastructure — fiber, routers, wireless links — across field sites, then handled customer-facing technical support when things went wrong.",
  },
  {
    range: "Nights & weekends, alongside the job above",
    title: "Self-Directed Full-Stack Web Development",
    org: "HTML, CSS, JavaScript, React, Next.js, Node.js",
    body: "Taught myself the frontend and backend web stack while working full-time, then shipped seven live, publicly deployed projects to prove it out — see below.",
  },
  {
    range: "Present",
    title: "Full-Stack Web Developer",
    org: "Available for freelance & full-time roles",
    body: "Looking for React/Next.js work where understanding the full path — from the browser down to the wire — is actually worth something.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="border-b border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Experience
        </h2>

        <ol className="mt-14 border-l border-line pl-8">
          {timeline.map((entry, i) => (
            <li key={entry.title} className="relative pb-14 last:pb-0">
              <span
                className="absolute -left-9.25 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-base"
                style={{
                  background: i === timeline.length - 1 ? "#ff6a3d" : "#33d6c8",
                }}
              />
              <p className="font-mono text-sm text-muted">{entry.range}</p>
              <h3 className="font-display mt-1 text-xl font-semibold text-ink">
                {entry.title}
              </h3>
              <p className="mt-1 text-sm text-data">{entry.org}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
