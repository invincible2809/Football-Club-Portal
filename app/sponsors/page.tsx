import type { Metadata } from 'next';
import { club, sponsors } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';
import Form, { Field } from '@/components/Form';
import ContactFallback from '@/components/ContactFallback';

export const metadata: Metadata = { title: 'Sponsors', description: `Sponsor a team at ${club.name} and support grassroots football in Castle Bromwich.` };

export default function SponsorsPage() {
  const real = sponsors.filter((s) => !s.sample);
  return (
    <>
      <PageHeader title="Sponsors" intro="Local businesses help us keep football affordable for every family." />
      {real.length > 0 && (
        <Section title="Thank you to our sponsors">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {real.map((s) => (
              <li key={s.name}>
                <Card>
                  <p className="text-xs font-semibold uppercase text-lion-red">{s.tier}</p>
                  {s.url ? (
                    <a href={s.url} className="text-lg font-semibold underline" target="_blank" rel="noopener noreferrer">
                      {s.name}
                    </a>
                  ) : (
                    <p className="text-lg font-semibold">{s.name}</p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section title="Become a sponsor">
        <div className="grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {[
              ['Kit sponsor', 'Your logo on a team’s shirts for the season.'],
              ['Training wear sponsor', 'Branding on training tops and coats.'],
              ['Matchday / equipment sponsor', 'Help buy goals, balls and first-aid kits.'],
              ['Website partner', 'Your logo and link on this website.'],
            ].map(([t, d]) => (
              <li key={t}>
                <Card>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="text-sm">{d}</p>
                </Card>
              </li>
            ))}
          </ul>
          <Form name="sponsor" endpoint={club.formEndpoint} fallback={<ContactFallback what="talk about sponsorship" />}>
            <Field label="Your name" name="name" required />
            <Field label="Business name" name="business" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Message" name="message" as="textarea" />
          </Form>
        </div>
      </Section>
    </>
  );
}
