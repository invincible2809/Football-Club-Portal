import Link from 'next/link';
import type { ReactNode } from 'react';

export function PageHeader({ title, intro, kicker }: { title: string; intro?: ReactNode; kicker?: string }) {
  return (
    <div className="relative overflow-hidden bg-lion-blue text-white">
      <div className="absolute inset-y-0 right-0 w-1/3 skew-x-[-12deg] translate-x-16 bg-lion-red/90" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {kicker && <p className="font-display text-lg uppercase tracking-widest text-lion-gold">{kicker}</p>}
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{title}</h1>
        {intro && <div className="mt-3 max-w-2xl text-lg text-blue-50">{intro}</div>}
      </div>
    </div>
  );
}

export function Section({ title, children, action, className = '' }: { title?: string; children: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-8 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          {title && <h2 className="font-display text-3xl font-bold uppercase text-lion-blueDark dark:text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900 ${className}`}>{children}</div>;
}

export function ButtonLink({ href, children, variant = 'red' }: { href: string; children: ReactNode; variant?: 'red' | 'blue' | 'outline' }) {
  const styles = {
    red: 'bg-lion-red text-white hover:bg-lion-redDark',
    blue: 'bg-lion-blue text-white hover:bg-lion-blueDark',
    outline: 'border-2 border-current hover:bg-white/10',
  }[variant];
  const external = href.startsWith('http');
  const cls = `inline-flex items-center justify-center rounded-lg px-5 py-3 font-display text-lg uppercase tracking-wide ${styles}`;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold text-lion-blue underline-offset-4 hover:underline dark:text-blue-300">
      {children} →
    </Link>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border-l-4 border-lion-blue bg-blue-50 p-4 text-sm text-gray-800 dark:bg-blue-950 dark:text-gray-100">{children}</div>;
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-club max-w-3xl space-y-4 text-gray-800 dark:text-gray-200">{children}</div>;
}
