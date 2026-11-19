import type { Metadata } from 'next';
import { club, safeguardingContact } from '@/lib/data';
import { PageHeader, Section, Card, Prose } from '@/components/ui';

export const metadata: Metadata = { title: 'Safeguarding & Welfare', description: `How ${club.name} keeps children safe.` };

export default function SafeguardingPage() {
  const sg = safeguardingContact();
  return (
    <>
      <PageHeader title="Safeguarding & welfare" intro="The safety and wellbeing of every child at the club comes first." />
      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <Prose>
            <p>
              {club.name} follows The FA&apos;s safeguarding policy and procedures. All coaches, managers and volunteers who work with children hold
              an FA-approved DBS check and complete FA safeguarding training.
            </p>
            <h2>Worried about a child?</h2>
            <p>
              If you have a concern about the welfare of a child at the club, please speak to our {sg.role} straight away. If a child is in immediate
              danger, call <strong>999</strong>.
            </p>
            <ul>
              <li>
                The FA safeguarding team: <a href="mailto:safeguarding@thefa.com">safeguarding@thefa.com</a>
              </li>
              <li>
                NSPCC helpline: <a href="tel:08088005000">0808 800 5000</a>
              </li>
              <li>
                Childline (for children): <a href="tel:08001111">0800 1111</a>
              </li>
            </ul>
            <h2>Codes of conduct</h2>
            <p>Everyone at the club agrees to The FA&apos;s Respect codes of conduct:</p>
            <ul>
              <li>
                <strong>Players:</strong> play fairly, respect team-mates, opponents and the referee, and enjoy the game.
              </li>
              <li>
                <strong>Parents & spectators:</strong> encourage, never criticise; stay behind the respect barrier; let the coaches coach.
              </li>
              <li>
                <strong>Coaches & managers:</strong> put children&apos;s welfare first, give everyone fair game time, and lead by example.
              </li>
            </ul>
            <p>
              Read the full codes on{' '}
              <a href="https://www.englandfootball.com/run/safeguarding" target="_blank" rel="noopener noreferrer">
                England Football&apos;s safeguarding pages
              </a>
              .
            </p>
            <h2>Our policies</h2>
            <ul>
              <li>Safeguarding children policy (FA template)</li>
              <li>Anti-bullying policy</li>
              <li>Equality, diversity & inclusion policy</li>
              <li>Photography & social media policy: children are never named in photos, and photos are only used with parental consent</li>
            </ul>
            <p className="text-sm">Full copies of our policies are available from the club secretary.</p>
          </Prose>
          <aside>
            <Card className="border-l-4 !border-l-lion-red">
              <h2 className="font-display text-xl uppercase">{sg.role}</h2>
              {sg.person && (
                <p className="mt-2">
                  <strong>{sg.person.name}</strong>
                  {sg.person.phone && (
                    <>
                      <br />
                      <a className="underline" href={`tel:${sg.person.phone.replace(/\s/g, '')}`}>
                        {sg.person.phone}
                      </a>
                    </>
                  )}
                </p>
              )}
              {sg.fallback && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Our Club Welfare Officer will be named here shortly. Until then, please contact the Club Secretary.</p>}
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
