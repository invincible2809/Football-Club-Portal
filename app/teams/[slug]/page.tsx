import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { teams, getTeam, upcomingFixtures, pastFixtures, fulltimeTeamUrl, club } from '@/lib/data';
import { FixtureList } from '@/components/Fixture';
import { PageHeader, Section, Card, ButtonLink, Notice } from '@/components/ui';

export const dynamicParams = false;
export function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTeam((await params).slug);
  return t ? { title: `${t.ageGroup} ${t.nickname}`, description: `Fixtures, training and team info for ${t.name}.` } : {};
}

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const team = getTeam((await params).slug);
  if (!team) notFound();
  const ft = fulltimeTeamUrl(team);
  const upcoming = upcomingFixtures(team.slug);
  const past = pastFixtures(team.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: team.name,
    sport: 'Soccer',
    memberOf: { '@type': 'SportsOrganization', name: club.name },
    event: upcoming
      .filter((f) => f.status === 'upcoming')
      .map((f) => ({ '@type': 'SportsEvent', name: `${f.home} v ${f.away}`, startDate: `${f.date}T${f.time ?? '10:00'}`, location: f.venueRaw ?? club.ground.name })),
  };

  return (
    <>
      <PageHeader kicker={`${team.ageGroup} · ${club.league.shortName}`} title={team.nickname} intro={team.name} />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 font-display text-2xl font-bold uppercase">Fixtures</h2>
            <FixtureList items={upcoming} showTeam={false} empty="No upcoming fixtures right now." />
          </section>
          <section>
            <h2 className="mb-3 font-display text-2xl font-bold uppercase">Played</h2>
            <FixtureList items={past} showTeam={false} empty="No games played yet this season." />
          </section>
          {team.format === 'development' && (
            <Notice>
              {team.ageGroup} football is development football: no scores or league tables are published. The focus is on learning, fun and
              everyone getting game time.
            </Notice>
          )}
        </div>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-display text-xl uppercase">Team info</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="font-semibold">Training</dt>
                <dd>{team.training ?? 'Details shared with registered families – ask the club.'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Manager</dt>
                <dd>{team.manager ?? 'Contact the club secretary.'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Home ground</dt>
                <dd>
                  <a className="underline" href={club.ground.mapUrl} target="_blank" rel="noopener noreferrer">
                    {club.ground.name}, {club.ground.postcode}
                  </a>
                </dd>
              </div>
            </dl>
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase">Never miss a game</h2>
            <p className="mt-2 text-sm">Subscribe to the {team.nickname} calendar on your phone. It updates automatically.</p>
            <div className="mt-3 flex flex-col gap-2">
              <ButtonLink href={`/calendars/${team.slug}.ics`} variant="blue">
                Add to calendar
              </ButtonLink>
              {ft && (
                <a className="text-center text-sm underline" href={ft} target="_blank" rel="noopener noreferrer">
                  View on FA Full-Time
                </a>
              )}
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase">Squad</h2>
            <p className="mt-2 text-sm">
              To protect our young players we don&apos;t publish squad lists or players&apos; names online. <Link className="underline" href="/join/">Want to join?</Link>
            </p>
          </Card>
        </aside>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
