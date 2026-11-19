import Link from 'next/link';
import type { Metadata } from 'next';
import { ageGroups, club, upcomingFixtures, opponent, formatDate } from '@/lib/data';
import { PageHeader, Section, Notice } from '@/components/ui';

export const metadata: Metadata = { title: 'Our Teams', description: `Youth teams at ${club.name}, playing in the ${club.league.name}.` };

export default function TeamsPage() {
  return (
    <>
      <PageHeader kicker="2026/27 season" title="Our teams" intro={`All our teams play in the ${club.league.name} (${club.league.shortName}).`} />
      {ageGroups.map((g) => (
        <Section key={g.age} title={g.age}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {g.teams.map((t) => {
              const next = upcomingFixtures(t.slug).find((f) => f.status === 'upcoming');
              return (
                <li key={t.slug} className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
                  <Link href={`/teams/${t.slug}/`} className="block rounded-xl p-5 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <p className="font-display text-sm uppercase tracking-widest text-lion-red">{t.ageGroup}</p>
                    <h3 className="font-display text-3xl font-bold uppercase text-lion-blueDark dark:text-white">{t.nickname}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.format === 'development' ? 'Development football (no scores or tables)' : 'Competitive league'}</p>
                    {next && (
                      <p className="mt-3 text-sm">
                        <span className="font-semibold">Next:</span> {formatDate(next.date)} {next.time} {next.isHome ? 'v' : '@'} {opponent(next)}
                      </p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      ))}
      <Section>
        <Notice>
          Looking for a different age group? We&apos;re growing every season – <Link className="underline" href="/join/">register your interest</Link> and we&apos;ll let you
          know when a place is available.
        </Notice>
      </Section>
    </>
  );
}
