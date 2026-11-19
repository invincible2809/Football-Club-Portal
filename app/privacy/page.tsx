import type { Metadata } from 'next';
import { club } from '@/lib/data';
import { PageHeader, Section, Prose } from '@/components/ui';

export const metadata: Metadata = { title: 'Privacy Notice' };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy notice" />
      <Section>
        <Prose>
          <p>
            <em>This notice is a starting template. The club committee should review it before launch.</em>
          </p>
          <p>
            {club.name} (&ldquo;the club&rdquo;) is committed to protecting the personal data of players, parents, volunteers and visitors in line
            with UK GDPR and the Data Protection Act 2018.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Player registration: child&apos;s first name, date of birth, medical information you choose to share, photo consent.</li>
            <li>Parent / guardian: name, email address, phone number.</li>
            <li>Volunteers and sponsors: name and contact details.</li>
          </ul>
          <h2>Why we collect it</h2>
          <p>
            To register players with the club and league, keep children safe, contact families about training and matches, and meet The FA&apos;s
            requirements. We only collect what we need.
          </p>
          <h2>Who sees it</h2>
          <p>
            Club committee members and your child&apos;s coaches. Registration details are shared with The FA and the {club.league.name} when
            required for player registration. We never sell your data.
          </p>
          <h2>Children&apos;s privacy on this website</h2>
          <ul>
            <li>We never publish children&apos;s surnames, and we don&apos;t publish squad lists.</li>
            <li>Photos only appear where a parent has given consent, and children are never named in them.</li>
          </ul>
          <h2>Cookies</h2>
          <p>
            This website does not use analytics or advertising cookies. The Facebook feed on the News page only loads, and only sets Facebook
            cookies, if you click &ldquo;Load Facebook posts&rdquo;. Maps open on Google Maps.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the data we hold about you or your child at any time by contacting the club secretary. You can
            also complain to the Information Commissioner&apos;s Office (ico.org.uk).
          </p>
        </Prose>
      </Section>
    </>
  );
}
