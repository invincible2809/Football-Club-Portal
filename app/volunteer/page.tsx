import type { Metadata } from 'next';
import { club } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';
import Form, { Field, Check } from '@/components/Form';
import ContactFallback from '@/components/ContactFallback';

export const metadata: Metadata = { title: 'Volunteer & Coach', description: `Help ${club.name} grow – coach, manage or help out.` };

const roles = [
  ['Coach / assistant coach', 'Run sessions and matchdays. We support you through the FA Introduction to Coaching Football course.'],
  ['Team manager', 'Organise fixtures, communicate with parents and support the coaches.'],
  ['Club Welfare Officer', 'Lead on safeguarding and make sure the club follows FA safeguarding policy. Full FA training provided.'],
  ['Matchday helper', 'Set up pitches and goals, run the refreshments, welcome visiting teams.'],
  ['Committee member', 'Help run the club – treasurer, fundraising, kit, social media.'],
] as const;

export default function VolunteerPage() {
  return (
    <>
      <PageHeader title="Volunteer with us" intro="Grassroots football runs on volunteers. No experience needed: just enthusiasm and a few hours a week." />
      <Section title="Roles we need">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(([title, text]) => (
            <li key={title}>
              <Card className="h-full">
                <h3 className="font-display text-xl uppercase text-lion-blueDark dark:text-white">{title}</h3>
                <p className="mt-2 text-sm">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm">
          Everyone in a role working with children needs an <strong>FA-approved DBS check</strong> and must complete FA Safeguarding Children
          training. The club arranges and pays for both.
        </p>
      </Section>
      <Section title="Get in touch">
        <div className="max-w-2xl">
          <Form name="volunteer" endpoint={club.formEndpoint} fallback={<ContactFallback what="volunteer" />}>
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Which role(s) interest you?" name="roles" as="textarea" />
            <Check name="privacy" required>
              I agree to the club storing these details to contact me about volunteering.
            </Check>
          </Form>
        </div>
      </Section>
    </>
  );
}
