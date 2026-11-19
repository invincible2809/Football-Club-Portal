import { club, type Fixture, resolveVenue, getTeam } from './data';

const pad = (n: number) => String(n).padStart(2, '0');
const esc = (s: string) => s.replace(/[\;,]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');

function event(f: Fixture) {
  const team = getTeam(f.teamSlug);
  const venue = resolveVenue(f);
  const [y, m, d] = f.date.split('-').map(Number);
  const [hh, mm] = (f.time ?? '10:00').split(':').map(Number);
  const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
  const endDate = new Date(Date.UTC(y, m - 1, d, hh, mm + 90));
  const end = `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth() + 1)}${pad(endDate.getUTCDate())}T${pad(endDate.getUTCHours())}${pad(endDate.getUTCMinutes())}00`;
  const status = f.status === 'cancelled' || f.status === 'postponed' || f.status === 'abandoned' ? 'CANCELLED' : 'CONFIRMED';
  return [
    'BEGIN:VEVENT',
    `UID:${f.id}@castlebromwichlions`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/London:${start}`,
    `DTEND;TZID=Europe/London:${end}`,
    `SUMMARY:${esc(`${team?.nickname ?? ''} ${f.isHome ? 'v' : '@'} ${f.isHome ? f.away : f.home}`.trim())}`,
    venue ? `LOCATION:${esc([venue.name, venue.pitch, venue.postcode].filter(Boolean).join(', '))}` : '',
    `DESCRIPTION:${esc(`${f.home} v ${f.away}${f.sourceUrl ? `\n${f.sourceUrl}` : ''}`)}`,
    `STATUS:${status}`,
    'END:VEVENT',
  ].filter(Boolean);
}

export function buildCalendar(name: string, list: Fixture[]) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${club.name}//Fixtures//EN`,
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${esc(name)}`,
    'X-WR-TIMEZONE:Europe/London',
    ...list.flatMap(event),
    'END:VCALENDAR',
  ].join('\r\n');
}
