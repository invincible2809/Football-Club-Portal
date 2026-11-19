import Link from 'next/link';
import { club, ageGroups, upcomingFixtures, pastFixtures, getTeam, opponent, resolveVenue, formatDate, sponsors } from '@/lib/data';
import { getPosts } from '@/lib/news';
import Crest from '@/components/Crest';
import Countdown from '@/components/Countdown';
import { FixtureList } from '@/components/Fixture';
import { ButtonLink, Card, MoreLink, Section } from '@/components/ui';

export default function Home() {
  const upcoming = upcomingFixtures();
  const next = upcoming.find((f) => f.status === 'upcoming');
  const nextTeam = next ? getTeam(next.teamSlug) : null;
  const nextVenue = next ? resolveVenue(next) : null;
  const posts = getPosts().slice(0, 3);
  const recent = pastFixtures().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-lion-blueDark text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-lion-blue to-lion-blueDark md:bg-[linear-gradient(115deg,#163A7A_0%,#1F4FA3_55%,#D7262B_55%,#A81B20_100%)]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-lion-red md:hidden" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-display text-lg uppercase tracking-[0.2em] text-lion-gold">Est. {club.foundedYear} · {club.league.shortName}</p>
            <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none sm:text-7xl">
              Say hello to our <span className="text-lion-gold">best season yet.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-blue-50">
              {club.name} is a friendly youth football club in Castle Bromwich, Birmingham, with teams playing in the {club.league.name}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/join/">Join the Lions</ButtonLink>
              <ButtonLink href="/volunteer/" variant="outline">
                Volunteer
              </ButtonLink>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-sm">
              <span className="text-lion-gold" aria-hidden>
                ★
              </span>
              {club.accreditation.label}
            </p>
          </div>
          <Crest size={260} className="mx-auto hidden ring-8 md:block" />
        </div>
      </section>

      {/* Next match */}
      {next && nextTeam && (
        <section aria-labelledby="next-match" className="bg-lion-ink text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 id="next-match" className="font-display text-sm uppercase tracking-widest text-lion-gold">
                Next match
              </h2>
              <p className="font-display text-2xl uppercase sm:text-3xl">
                {nextTeam.ageGroup} {nextTeam.nickname} {next.isHome ? 'v' : '@'} {opponent(next)}
              </p>
              <p className="text-sm text-gray-300">
                {formatDate(next.date, { weekday: 'long', day: 'numeric', month: 'long' })} · {next.time}
                {nextVenue ? ` · ${nextVenue.name}${nextVenue.pitch ? ` (${nextVenue.pitch})` : ''}` : ''}
              </p>
            </div>
            <Countdown date={next.date} time={next.time} />
          </div>
        </section>
      )}

      <Section title="Coming up" action={<MoreLink href="/fixtures/">All fixtures</MoreLink>}>
        <FixtureList items={upcoming.slice(0, 6)} empty="No fixtures scheduled right now – check back soon." />
      </Section>

      <Section title="Our teams" action={<MoreLink href="/teams/">All teams</MoreLink>}>
        {ageGroups.map((g) => (
          <div key={g.age}>
            <h3 className="mb-3 font-display text-xl uppercase text-lion-red">{g.age}</h3>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {g.teams.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/teams/${t.slug}/`}
                    className="group block overflow-hidden rounded-xl bg-lion-blue p-5 text-white shadow transition hover:-translate-y-0.5 hover:bg-lion-blueDark"
                  >
                    <span className="block font-display text-sm uppercase tracking-widest text-lion-gold">{t.ageGroup}</span>
                    <span className="block font-display text-3xl font-bold uppercase">{t.nickname}</span>
                    <span className="mt-2 block text-sm text-blue-100 group-hover:underline">Team page →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
        <Section title="Latest news" action={<MoreLink href="/news/">All news</MoreLink>} className="w-full">
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Card>
                  <p className="text-xs font-semibold uppercase text-lion-red">
                    {p.category} · {formatDate(p.date, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <Link href={`/news/${p.slug}/`} className="mt-1 block text-lg font-semibold hover:underline">
                    {p.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{p.excerpt}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Recently played" action={<MoreLink href="/fixtures/">Results</MoreLink>} className="w-full">
          <FixtureList items={recent} />
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Our U8 teams play development football, so scores aren&apos;t recorded – it&apos;s all about learning and enjoying the game.
          </p>
        </Section>
      </div>

      {/* Join / volunteer CTA */}
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-lion-red p-8 text-white">
            <h2 className="font-display text-3xl font-bold uppercase">Want to play?</h2>
            <p className="mt-2">We welcome boys and girls of all abilities. Come along to a free trial session and meet the coaches.</p>
            <div className="mt-5">
              <ButtonLink href="/join/" variant="outline">
                Register interest
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-2xl bg-lion-blue p-8 text-white">
            <h2 className="font-display text-3xl font-bold uppercase">Help us grow</h2>
            <p className="mt-2">Coaches, helpers, and local businesses keep grassroots football going. Get involved with the Lions.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/volunteer/" variant="outline">
                Volunteer
              </ButtonLink>
              <ButtonLink href="/sponsors/" variant="outline">
                Sponsor a team
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {sponsors.some((s) => !s.sample) && (
        <Section title="Our sponsors">
          <ul className="flex flex-wrap gap-6">
            {sponsors
              .filter((s) => !s.sample)
              .map((s) => (
                <li key={s.name} className="font-semibold">
                  {s.name}
                </li>
              ))}
          </ul>
        </Section>
      )}
    </>
  );
}
