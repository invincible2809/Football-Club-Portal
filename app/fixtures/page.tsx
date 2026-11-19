import type { Metadata } from 'next';
import { fixtures, teams, todayUK, club } from '@/lib/data';
import { FixtureRow } from '@/components/Fixture';
import FixturesBrowser from '@/components/FixturesBrowser';
import { PageHeader, Section, Notice } from '@/components/ui';

export const metadata: Metadata = { title: 'Fixtures & Results', description: `Fixtures and results for every ${club.name} team.` };

export default function FixturesPage() {
  const rows = fixtures.map((f) => ({ ...f, _row: <FixtureRow key={f.id} f={f} /> }));
  return (
    <>
      <PageHeader kicker="2026/27" title="Fixtures & results" intro="Updated daily from FA Full-Time. Tap + Calendar to save a match to your phone." />
      <Section>
        <FixturesBrowser fixtures={rows} teams={teams} today={todayUK()} />
      </Section>
      <Section>
        <Notice>
          Kick-off times can change at short notice. Always check with your team manager. Official fixtures are on{' '}
          <a className="underline" href={club.league.url} target="_blank" rel="noopener noreferrer">
            FA Full-Time
          </a>
          .
        </Notice>
      </Section>
    </>
  );
}
