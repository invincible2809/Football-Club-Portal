import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseTeamPage, parseScore, parseDate, cleanVenue, mergeFixtures } from './lib/fulltime.mjs';

const html = readFileSync(new URL('./__fixtures__/team-page.html', import.meta.url), 'utf8');
const team = { slug: 'u8-spitfires', name: 'Castle Bromwich Lions U8 Spitfires' };

test('parses fixtures and results from a Full-Time team page', () => {
  const f = parseTeamPage(html, team);
  assert.equal(f.length, 3);
  const upcoming = f.find((x) => x.id === 'ft-31198475');
  assert.deepEqual(
    { date: upcoming.date, time: upcoming.time, status: upcoming.status, isHome: upcoming.isHome, away: upcoming.away, venueRaw: upcoming.venueRaw, type: upcoming.type },
    { date: '2026-11-22', time: '10:30', status: 'upcoming', isHome: true, away: 'Hampton U8 Reds AOB', venueRaw: 'CASTLE BROMWICH PLAYING FIELDS Pitch 3', type: 'DEVP' },
  );
  const dev = f.find((x) => x.id === 'ft-31164620');
  assert.equal(dev.status, 'played');
  assert.equal(dev.homeScore, null);
  assert.equal(dev.isHome, false);
  const scored = f.find((x) => x.id === 'ft-99');
  assert.equal(scored.homeScore, 3);
  assert.equal(scored.awayScore, 1);
});

test('maps Full-Time status codes', () => {
  assert.equal(parseScore('VS').status, 'upcoming');
  assert.equal(parseScore(' X - X ').status, 'played');
  assert.equal(parseScore('P - P').status, 'postponed');
  assert.equal(parseScore('A - A').status, 'abandoned');
  assert.equal(parseScore('C - C').status, 'cancelled');
  assert.equal(parseScore('H - W').status, 'unknown');
});

test('parses dates and venues', () => {
  assert.equal(parseDate('06/09/26'), '2026-09-06');
  assert.equal(parseDate('nonsense'), null);
  assert.equal(cleanVenue('ARDEN GARAGES STADIUM 3G Pitch 1A - 09:30AM'), 'ARDEN GARAGES STADIUM 3G Pitch 1A');
  assert.equal(cleanVenue('   '), null);
});

test('merge replaces seed records, keeps old games and respects locks', () => {
  const existing = [
    { id: 'seed-u8-spitfires-2026-11-22', teamSlug: 'u8-spitfires', date: '2026-11-22', source: 'seed', venueRaw: 'OLD' },
    { id: 'seed-u8-spitfires-2026-09-06', teamSlug: 'u8-spitfires', date: '2026-09-06', source: 'seed' },
    { id: 'ft-31164620', teamSlug: 'u8-spitfires', date: '2026-11-15', source: 'fulltime', status: 'cancelled', locked: true },
  ];
  const merged = mergeFixtures(existing, parseTeamPage(html, team));
  assert.equal(merged.length, 4);
  assert.ok(merged.some((f) => f.id === 'ft-31198475' && f.venueRaw === 'CASTLE BROMWICH PLAYING FIELDS Pitch 3'));
  assert.ok(merged.some((f) => f.id === 'seed-u8-spitfires-2026-09-06'));
  assert.equal(merged.find((f) => f.id === 'ft-31164620').status, 'cancelled');
  assert.deepEqual(merged.map((f) => f.date), [...merged.map((f) => f.date)].sort());
});
