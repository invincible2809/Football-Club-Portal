import type { Metadata } from 'next';
import { club } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';
import Form, { Field, Check } from '@/components/Form';
import ContactFallback from '@/components/ContactFallback';
import { SocialLinks } from '@/components/Social';

export const metadata: Metadata = { title: 'Contact', description: `Contact ${club.name}.` };

export default function ContactPage() {
  const { chairman, secretary } = club.contacts;
  return (
    <>
      <PageHeader title="Contact us" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <Section className="!p-0">
          <Form name="contact" endpoint={club.formEndpoint} fallback={<ContactFallback />}>
            <Field label="Your name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Message" name="message" as="textarea" required />
            <Check name="privacy" required>
              I agree to the club storing these details to reply to me.
            </Check>
          </Form>
        </Section>
        <aside className="space-y-4">
          <Card>
            <h2 className="font-display text-xl uppercase">Committee</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {[
                ['Chairman', chairman],
                ['Secretary', secretary],
              ].map(([role, p]) => (
                <li key={role as string}>
                  <strong>{role as string}:</strong> {(p as typeof chairman).name}
                  <br />
                  <a className="underline" href={`tel:${(p as typeof chairman).phone.replace(/\s/g, '')}`}>
                    {(p as typeof chairman).phone}
                  </a>
                </li>
              ))}
              {club.email && (
                <li>
                  <strong>Email:</strong>{' '}
                  <a className="underline" href={`mailto:${club.email}`}>
                    {club.email}
                  </a>
                </li>
              )}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-xl uppercase">Find us</h2>
            <p className="mt-2 text-sm">
              {club.ground.name}
              <br />
              {club.ground.area}
              <br />
              {club.ground.postcode}
            </p>
            <a className="mt-2 inline-block text-sm underline" href={club.ground.mapUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </Card>
          <Card>
            <h2 className="mb-3 font-display text-xl uppercase">Follow us</h2>
            <SocialLinks tone="dark" />
          </Card>
        </aside>
      </div>
    </>
  );
}
