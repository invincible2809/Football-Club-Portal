import type { Metadata } from 'next';
import { club } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';

export const metadata: Metadata = { title: 'About the Club', description: `${club.name} was founded in ${club.founded} and plays in the ${club.league.name}.` };

export default function AboutPage() {
  const c = club.contacts;
  const committee = [
    ['Chairman', c.chairman],
    ['Secretary', c.secretary],
    ['Treasurer', c.treasurer],
    ['Club Welfare Officer', c.welfareOfficer],
  ] as const;
  return (
    <>
      <PageHeader kicker={`Est. ${club.foundedYear}`} title="About the Lions" intro={`Founded in ${club.founded}, ${club.name} has grown into a club with multiple youth teams and FA 1-Star accreditation.`} />
      <Section title="Our story">
        <ol className="relative max-w-3xl border-l-4 border-lion-red pl-6">
          {club.timeline.map((t) => (
            <li key={t.title} className="mb-8 last:mb-0">
              <span className="absolute -left-[11px] mt-1.5 h-4 w-4 rounded-full border-4 border-white bg-lion-gold dark:border-gray-950" aria-hidden />
              {t.date && <p className="font-display text-sm uppercase tracking-widest text-lion-red">{t.date}</p>}
              <h3 className="font-display text-2xl font-bold uppercase">{t.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Accreditation">
        <Card className="max-w-3xl">
          <p className="text-lg">
            <span className="text-2xl text-lion-gold" aria-hidden>
              ★
            </span>{' '}
            <strong>{club.accreditation.label}</strong>
          </p>
          <p className="mt-2 text-sm">
            England Football Accreditation recognises clubs that meet The FA&apos;s standards for safeguarding, coaching, inclusion and club
            management.
          </p>
        </Card>
      </Section>
      <Section title="Committee">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {committee
            .filter(([, p]) => p)
            .map(([role, p]) => (
              <li key={role}>
                <Card>
                  <p className="text-xs font-semibold uppercase text-lion-red">{role}</p>
                  <p className="text-lg font-semibold">{p!.name}</p>
                  {'phone' in p! && p!.phone && (
                    <a className="text-sm underline" href={`tel:${p!.phone.replace(/\s/g, '')}`}>
                      {p!.phone}
                    </a>
                  )}
                </Card>
              </li>
            ))}
        </ul>
      </Section>
      <Section title="Our ground">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-lg font-semibold">{club.ground.name}</p>
            <p>
              {club.ground.area}, {club.ground.postcode}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Listed on FA Full-Time as &ldquo;{club.ground.alsoKnownAs}&rdquo;.</p>
            {club.ground.parking && <p className="mt-2">{club.ground.parking}</p>}
            <a className="mt-3 inline-block rounded-lg bg-lion-blue px-4 py-2 text-white" href={club.ground.mapUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </div>
          <iframe
            title={`Map of ${club.ground.name}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${club.ground.name}, ${club.ground.postcode}`)}&output=embed`}
            className="h-72 w-full rounded-xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}
