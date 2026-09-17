export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Getahun Guadie Mamo</p>
        <p className="font-mono">Built with Next.js, Tailwind CSS &amp; Framer Motion</p>
      </div>
    </footer>
  );
}
