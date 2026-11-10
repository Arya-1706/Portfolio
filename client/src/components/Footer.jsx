
const socials = [
  { label: 'GitHub', href: 'https://github.com/Arya-1706' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aryajha17/' },
];

export default function Footer() {
  return (
    <footer className="border-t border-burgundy/40 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted md:flex-row">
        <p>&copy; {new Date().getFullYear()} Arya Jha</p>

        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-cream"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
