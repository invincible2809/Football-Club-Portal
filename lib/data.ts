import club from '@/content/club.json';
import teamsData from '@/content/teams.json';
import fixturesData from '@/content/fixtures.json';
import venuesData from '@/content/venues.json';
import sponsorsData from '@/content/sponsors.json';
import galleryData from '@/content/gallery.json';

export type Club = typeof club;
export type Person = { name: string; phone?: string | null; email?: string | null } | null;

export type Team = {
  slug: string;
  name: string;
  nickname: string;
  ageGroup: string;
  fulltimeTeamId: string | null;
  fulltimeDivisionSeasonId: string | null;
  format: 'development' | 'competitive';
  showScores: boolean;
  training: string | null;
  manager: string | null;
};

export type FixtureStatus = 'upcoming' | 'played' | 'postponed' | 'abandoned' | 'cancelled' | 'unknown';

export type Fixture = {
  id: string;
  teamSlug: string;
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM, UK local time
  type: string | null;
  home: string;
  away: string;
  isHome: boolean;
  status: FixtureStatus;
  homeScore: number | null;
  awayScore: number | null;
  venueRaw: string | null;
  source: string;
  sourceUrl: string | null;
  locked?: boolean;
};

export type Venue = { name: string; postcode: string | null; isHome: boolean; mapUrl: string; pitch: string | null };

export { club };
export const teams = teamsData.teams as Team[];
export const fixtures = (fixturesData.fixtures as Fixture[]).slice().sort((a, b) => fixtureKey(a).localeCompare(fixtureKey(b)));
export const sponsors = sponsorsData.sponsors;
export const gallery = galleryData.albums as { title: string; date: string; photos: { src: string; alt: string }[] }[];

const venues = venuesData.venues as { match: string; name: string; postcode: string | null; isHome: boolean }[];

function fixtureKey(f: Fixture) {
  return `${f.date}T${f.time ?? '00:00'}`;
}

export const getTeam = (slug: string) => teams.find((t) => t.slug === slug);

export const ageGroups = Array.from(new Set(teams.map((t) => t.ageGroup))).map((age) => ({
  age,
  teams: teams.filter((t) => t.ageGroup === age),
}));

/** Today's date in UK time as YYYY-MM-DD (the build runs daily, so this is "as of the last build"). */
export function todayUK(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(now);
}

export function upcomingFixtures(teamSlug?: string) {
  const today = todayUK();
  return fixtures.filter((f) => f.date >= today && f.status !== 'played' && (!teamSlug || f.teamSlug === teamSlug));
}

export function pastFixtures(teamSlug?: string) {
  const today = todayUK();
  return fixtures
    .filter((f) => (f.date < today || f.status === 'played') && (!teamSlug || f.teamSlug === teamSlug))
    .reverse();
}

/** Map Full-Time's free-text venue to a tidy venue record. */
export function resolveVenue(f: Fixture): Venue | null {
  const raw = f.venueRaw ?? (f.isHome ? 'CASTLE BROMWICH PLAYING FIELDS' : null);
  if (!raw) return null;
  const upper = raw.toUpperCase();
  const known = venues.find((v) => upper.startsWith(v.match));
  const pitch = known ? raw.slice(known.match.length).trim() || null : null;
  const name = known?.name ?? titleCase(raw);
  const q = known?.postcode ? `${name} ${known.postcode}` : name;
  return {
    name,
    postcode: known?.postcode ?? null,
    isHome: known?.isHome ?? false,
    pitch,
    mapUrl: known?.isHome ? club.ground.mapUrl : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
  };
}

function titleCase(s: string) {
  return s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

export function opponent(f: Fixture) {
  return f.isHome ? f.away : f.home;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return new Intl.DateTimeFormat('en-GB', { ...opts, timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
}

export const statusLabel: Record<FixtureStatus, string> = {
  upcoming: 'Upcoming',
  played: 'Played',
  postponed: 'Postponed',
  abandoned: 'Abandoned',
  cancelled: 'Cancelled',
  unknown: 'Check status',
};

export function fulltimeTeamUrl(t: Team) {
  if (!t.fulltimeTeamId) return null;
  return t.fulltimeDivisionSeasonId
    ? `https://fulltime.thefa.com/displayTeam.html?divisionseason=${t.fulltimeDivisionSeasonId}&teamID=${t.fulltimeTeamId}`
    : `https://fulltime.thefa.com/displayTeam.html?id=${t.fulltimeTeamId}`;
}

/** Contact to show for safeguarding: Welfare Officer, or the Secretary until one is named. */
export function safeguardingContact() {
  const w = club.contacts.welfareOfficer as Person;
  return w ? { role: 'Club Welfare Officer', person: w, fallback: false } : { role: 'Club Secretary', person: club.contacts.secretary as Person, fallback: true };
}
