import Link from 'next/link';
import { club, safeguardingContact } from '@/lib/data';
import Crest from './Crest';
import { SocialLinks } from './Social';

export default function Footer() {
  const sg = safeguardingContact();
  return (
    <footer className="mt-16 bg-lion-ink text-gray-200">
      <div className="h-1 bg-gradient-to-r from-lion-red via-lion-gold to-lion-blue" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Crest size={56} />
            <p className="font-display text-xl font-bold uppercase leading-tight text-white">
              {club.name}
              <span className="block text-sm font-normal tracking-widest text-lion-gold">Est. {club.foundedYear}</span>
            </p>
          </div>
          <p className="mt-4 text-sm">{club.accreditation.label}</p>
          <p className="text-sm">Members of the {club.league.name}</p>
        </div>
        <div>
          <h2 className="font-display text-lg uppercase text-white">Home ground</h2>
          <p className="mt-2 text-sm">
            {club.ground.name}
            <br />
            {club.ground.area}
            <br />
            {club.ground.postcode}
          </p>
          <a className="mt-2 inline-block text-sm text-lion-gold underline" href={club.ground.mapUrl} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
        </div>
        <div>
          <h2 className="font-display text-lg uppercase text-white">Club</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {[
              ['/join/', 'Join the Lions'],
              ['/volunteer/', 'Volunteer & coach'],
              ['/sponsors/', 'Sponsors'],
              ['/tables/', 'League tables'],
              ['/safeguarding/', 'Safeguarding'],
              ['/privacy/', 'Privacy'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="hover:text-lion-gold hover:underline" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg uppercase text-white">Safeguarding</h2>
          <p className="mt-2 text-sm">
            Worried about a child? Contact our {sg.role}
            {sg.person ? `, ${sg.person.name}` : ''}
            {sg.person?.phone ? ` on ${sg.person.phone}` : ''}. In an emergency call 999.
          </p>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} {club.name}. Fixtures courtesy of FA Full-Time.
      </p>
    </footer>
  );
}
