'use client';
import { useMemo, useState } from 'react';
import type { Fixture, Team } from '@/lib/data';

type Props = { fixtures: (Fixture & { _row: React.ReactNode })[]; teams: Team[]; today: string };

/** Client-side filter over server-rendered fixture rows. */
export default function FixturesBrowser({ fixtures, teams, today }: Props) {
  const [team, setTeam] = useState('all');
  const [when, setWhen] = useState<'upcoming' | 'results' | 'all'>('upcoming');
  const list = useMemo(() => {
    let l = fixtures.filter((f) => team === 'all' || f.teamSlug === team);
    if (when === 'upcoming') l = l.filter((f) => f.date >= today && f.status !== 'played');
    if (when === 'results') l = l.filter((f) => f.date < today || f.status === 'played').reverse();
    return l;
  }, [fixtures, team, when, today]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <label className="flex flex-col text-sm font-semibold">
          Team
          <select value={team} onChange={(e) => setTeam(e.target.value)} className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal dark:border-gray-600 dark:bg-gray-900">
            <option value="all">All teams</option>
            {teams.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.ageGroup} {t.nickname}
              </option>
            ))}
          </select>
        </label>
        <fieldset className="flex flex-col text-sm font-semibold">
          <legend>Show</legend>
          <div className="mt-1 inline-flex overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600">
            {(['upcoming', 'results', 'all'] as const).map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={when === w}
                onClick={() => setWhen(w)}
                className="px-4 py-2 font-normal capitalize aria-pressed:bg-lion-blue aria-pressed:text-white"
              >
                {w === 'results' ? 'Played' : w}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length} fixtures shown
      </p>
      {list.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No fixtures match.</p>
      ) : (
        <ul className="rounded-xl border border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">{list.map((f) => f._row)}</ul>
      )}
    </div>
  );
}
