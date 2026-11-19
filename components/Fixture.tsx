import Link from 'next/link';
import { type Fixture, getTeam, resolveVenue, formatDate, statusLabel, opponent } from '@/lib/data';

const badge: Record<string, string> = {
  upcoming: 'bg-lion-blue text-white',
  played: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
  postponed: 'bg-amber-200 text-amber-950',
  abandoned: 'bg-amber-200 text-amber-950',
  cancelled: 'bg-lion-red text-white',
  unknown: 'bg-purple-200 text-purple-950',
};

export function StatusBadge({ status }: { status: Fixture['status'] }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${badge[status]}`}>{statusLabel[status]}</span>;
}

export function scoreText(f: Fixture) {
  const team = getTeam(f.teamSlug);
  if (f.status !== 'played' || !team?.showScores || f.homeScore == null) return null;
  return `${f.homeScore} – ${f.awayScore}`;
}

export function FixtureRow({ f, showTeam = true }: { f: Fixture; showTeam?: boolean }) {
  const team = getTeam(f.teamSlug);
  const venue = resolveVenue(f);
  const score = scoreText(f);
  const cancelled = ['cancelled', 'postponed', 'abandoned'].includes(f.status);
  return (
    <li className="flex flex-col gap-2 border-b border-gray-200 py-3 last:border-0 dark:border-gray-700 sm:flex-row sm:items-center sm:gap-4">
      <div className="w-32 shrink-0 text-sm">
        <time dateTime={f.date} className="font-semibold">
          {formatDate(f.date)}
        </time>
        {f.time && <span className="ml-2 text-gray-600 dark:text-gray-400">{f.time}</span>}
      </div>
      <div className="flex-1">
        <p className={`font-medium ${cancelled ? 'line-through decoration-lion-red' : ''}`}>
          {showTeam && team && (
            <Link href={`/teams/${team.slug}/`} className="mr-1 font-display text-lg uppercase text-lion-red hover:underline">
              {team.ageGroup} {team.nickname}
            </Link>
          )}
          <span className="text-gray-600 dark:text-gray-400">{f.isHome ? 'v' : '@'}</span> {opponent(f)}
          <span className="ml-2 rounded bg-gray-100 px-1.5 text-xs font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">{f.isHome ? 'H' : 'A'}</span>
        </p>
        {venue && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {venue.name}
              {venue.pitch ? ` · ${venue.pitch}` : ''}
            </a>
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {score ? <span className="font-display text-2xl font-bold">{score}</span> : <StatusBadge status={f.status} />}
        {f.status === 'upcoming' && (
          <a href={`/calendars/match/${f.id}.ics`} className="text-sm text-lion-blue underline dark:text-blue-300" aria-label={`Add ${team?.nickname} v ${opponent(f)} to calendar`}>
            + Calendar
          </a>
        )}
      </div>
    </li>
  );
}

export function FixtureList({ items, showTeam = true, empty = 'No fixtures to show.' }: { items: Fixture[]; showTeam?: boolean; empty?: string }) {
  if (items.length === 0) return <p className="text-gray-600 dark:text-gray-400">{empty}</p>;
  return (
    <ul className="rounded-xl border border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
      {items.map((f) => (
        <FixtureRow key={f.id} f={f} showTeam={showTeam} />
      ))}
    </ul>
  );
}
