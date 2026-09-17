import { Mail, Phone } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.01h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V23h-4v-6.7c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V23h-4V8.25z" />
    </svg>
  );
}

const methods = [
  {
    label: "Email",
    value: "aaron162103@gmail.com",
    href: "mailto:aaron162103@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+251 948 931 000",
    href: "tel:+251948931000",
    icon: Phone,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/getahun-guadie",
    href: "https://www.linkedin.com/in/getahun-guadie",
    icon: LinkedinIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Let&apos;s work together
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          Open to freelance contracts and full-time full-stack roles. Based in
          Addis Ababa, comfortable working with remote teams across time zones.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {methods.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-signal"
            >
              <Icon className="h-5 w-5 text-signal" />
              <div>
                <p className="font-mono text-xs text-muted">{label}</p>
                <p className="mt-1 text-sm text-ink wrap-break-word">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
