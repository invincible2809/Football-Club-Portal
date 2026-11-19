import { club } from '@/lib/data';

export default function ContactFallback({ what = 'get in touch' }: { what?: string }) {
  const { secretary, chairman } = club.contacts;
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">Online forms are coming soon. For now, to {what}:</p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Message us on{' '}
          <a className="text-lion-blue underline dark:text-blue-300" href={club.social.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </li>
        <li>
          Club Secretary {secretary.name}: <a className="underline" href={`tel:${secretary.phone.replace(/\s/g, '')}`}>{secretary.phone}</a>
        </li>
        <li>
          Chairman {chairman.name}: <a className="underline" href={`tel:${chairman.phone.replace(/\s/g, '')}`}>{chairman.phone}</a>
        </li>
        {club.email && (
          <li>
            Email: <a className="underline" href={`mailto:${club.email}`}>{club.email}</a>
          </li>
        )}
      </ul>
    </div>
  );
}
