import { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Work', href: '/#projects' },
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'Tools', href: '/#tools' },
  { label: 'Contact', href: '/#contact' },
];

const linkClass =
  'font-mono text-xs uppercase tracking-widest text-muted transition hover:text-cream';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-burgundy/40 bg-base/80 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main"
      >
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-cream"
        >
          Arya Jha
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="font-mono text-xs uppercase tracking-widest text-cream md:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul className="space-y-4 border-t border-burgundy/40 bg-base px-6 py-5 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}