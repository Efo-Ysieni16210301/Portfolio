const groups = [
  {
    label: "Frontend",
    items: [
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
    ],
  },
  {
    label: "Backend & data (currently building)",
    items: ["Node.js", "Firebase (Auth & Firestore)", "REST APIs", "JSON"],
  },
  {
    label: "Tools & deployment",
    items: ["Git / GitHub", "Vercel", "Netlify", "VS Code"],
  },
  {
    label: "The edge most developers don't have",
    items: [
      "TCP/IP & VLANs",
      "Routers & switches",
      "Latency troubleshooting",
      "Power & backup systems",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-line px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold text-ink">
          What I work with
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-mono text-sm text-data">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
