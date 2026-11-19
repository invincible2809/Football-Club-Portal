'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Crest from './Crest';

const nav = [
  { href: '/teams/', label: 'Teams' },
  { href: '/fixtures/', label: 'Fixtures' },
  { href: '/news/', label: 'News' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/about/', label: 'About' },
  { href: '/safeguarding/', label: 'Safeguarding' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-lion-blueDark text-white shadow-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-lion-gold focus:px-3 focus:py-2 focus:text-lion-ink">
        Skip to content
      </a>
      <div className="h-1 bg-gradient-to-r from-lion-red via-lion-gold to-lion-blue" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Crest size={44} />
          <span className="font-display text-xl font-bold uppercase leading-none tracking-wide">
            Castle Bromwich <span className="block text-lion-gold">Lions FC</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={path?.startsWith(n.href) ? 'page' : undefined}
                  className="rounded px-3 py-2 font-display text-lg uppercase tracking-wide hover:bg-white/10 aria-[current=page]:text-lion-gold"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/join/" className="ml-2 rounded bg-lion-red px-4 py-2 font-display text-lg uppercase tracking-wide hover:bg-lion-redDark">
                Join the Lions
              </Link>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="rounded p-2 hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-white/10 lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {[...nav, { href: '/join/', label: 'Join the Lions' }, { href: '/volunteer/', label: 'Volunteer' }, { href: '/sponsors/', label: 'Sponsors' }].map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block rounded px-2 py-3 font-display text-xl uppercase hover:bg-white/10">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
