import { club } from '@/lib/data';

const icons: Record<string, string> = {
  facebook: 'M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z',
  instagram: 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-8.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 3c2.4 0 2.7 0 3.7.1 3.2.1 4.6 1.7 4.8 4.8.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 3.1-1.6 4.7-4.8 4.8-1 .1-1.3.1-3.7.1s-2.7 0-3.7-.1c-3.2-.1-4.6-1.7-4.8-4.8C3.4 14.2 3.4 13.9 3.4 11.5s0-2.7.1-3.6C3.6 4.8 5 3.2 8.3 3.1 9.3 3 9.6 3 12 3Z',
  tiktok: 'M16.6 3c.3 2.3 1.6 3.7 3.9 3.8v2.6c-1.3.1-2.5-.3-3.9-1.1v4.9c0 6.2-6.8 8.1-9.5 3.7-1.8-2.8-.7-7.8 4.9-8v2.8c-.4.1-.9.2-1.3.3-1.3.4-2 1.2-1.8 2.6.4 2.7 5.3 3.5 4.9-1.8V3h2.8Z',
};

export function SocialLinks({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const links = (['facebook', 'instagram', 'tiktok'] as const).filter((k) => club.social[k]);
  return (
    <ul className="flex gap-3">
      {links.map((k) => (
        <li key={k}>
          <a
            href={club.social[k] as string}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${tone === 'light' ? 'bg-white/10 text-white hover:bg-lion-red' : 'bg-lion-blue text-white hover:bg-lion-red'}`}
          >
            <span className="sr-only">{club.name} on {k[0].toUpperCase() + k.slice(1)}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d={icons[k]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
