import type { Metadata } from 'next';
import Link from 'next/link';
import { club, teams } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';
import Form, { Field, Check } from '@/components/Form';
import ContactFallback from '@/components/ContactFallback';

export const metadata: Metadata = {
  title: 'Join the Lions',
  description: `Register your child for a free trial with ${club.name}, an FA-accredited youth football club in Castle Bromwich (B36).`,
};

export default function JoinPage() {
  return (
    <>
      <PageHeader kicker="New players welcome" title="Join the Lions" intro="Boys and girls of all abilities are welcome. Register your interest and we'll invite you to a free trial session." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <Section className="!p-0">
          <h2 className="mb-4 font-display text-2xl font-bold uppercase">Register interest</h2>
          <Form name="player-registration" endpoint={club.formEndpoint} fallback={<ContactFallback what="register your child" />} submitLabel="Register interest">
            <fieldset className="space-y-4">
              <legend className="font-semibold">About your child</legend>
              <Field label="Child's first name" name="child_first_name" required hint="We only need a first name at this stage." />
              <Field label="Date of birth" name="child_dob" type="date" required hint="Age groups are set by school year (1 September cut-off)." />
              <label className="block text-sm font-semibold">
                Preferred team / age group
                <select name="team" className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-900">
                  <option value="any">Not sure – please advise</option>
                  {teams.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.ageGroup} {t.nickname}
                    </option>
                  ))}
                  <option value="other">Another age group</option>
                </select>
              </label>
              <Field label="Medical information we should know about" name="medical" as="textarea" hint="Optional – e.g. asthma, allergies. Only shared with the team's coaches." />
            </fieldset>
            <fieldset className="space-y-4">
              <legend className="font-semibold">Parent / guardian</legend>
              <Field label="Your name" name="parent_name" required />
              <Field label="Email" name="parent_email" type="email" required />
              <Field label="Phone" name="parent_phone" type="tel" required />
            </fieldset>
            <fieldset className="space-y-3">
              <legend className="font-semibold">Consent</legend>
              <Check name="photo_consent">I&apos;m happy for photos of my child (never named) to appear on the club website and social media.</Check>
              <Check name="code_of_conduct" required>
                I have read the <Link className="underline" href="/safeguarding/">codes of conduct</Link> for players and parents.
              </Check>
              <Check name="privacy" required>
                I agree to the club storing these details as described in the <Link className="underline" href="/privacy/">privacy notice</Link>.
              </Check>
            </fieldset>
          </Form>
        </Section>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-display text-xl uppercase">Fees & subs</h2>
            <p className="mt-2 text-sm">{club.fees ?? 'Our current fees will be confirmed when you register. Ask a committee member for details.'}</p>
            {club.paymentUrl && (
              <a className="mt-3 inline-block rounded-lg bg-lion-blue px-4 py-2 text-white" href={club.paymentUrl} target="_blank" rel="noopener noreferrer">
                Pay online
              </a>
            )}
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase">What to expect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li>A free trial session with your age group</li>
              <li>DBS-checked, FA-qualified coaches</li>
              <li>Sunday morning development games in the {club.league.shortName}</li>
              <li>Home games at {club.ground.name}</li>
            </ul>
          </Card>
        </aside>
      </div>
    </>
  );
}
