// Parser for FA Full-Time team pages (https://fulltime.thefa.com/displayTeam.html).
// Pure functions only, so they can be unit-tested against saved HTML.
import * as cheerio from 'cheerio';

const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

/** "22/11/26" -> "2026-11-22" */
export function parseDate(ddmmyy) {
  const m = /^(\d{2})\/(\d{2})\/(\d{2,4})$/.exec(clean(ddmmyy));
  if (!m) return null;
  const year = m[3].length === 2 ? `20${m[3]}` : m[3];
  return `${year}-${m[2]}-${m[1]}`;
}

/**
 * Turn Full-Time's score cell into a status.
 *   "VS"     -> upcoming
 *   "X - X"  -> played, no score recorded (development football)
 *   "3 - 1"  -> played with score
 *   "P - P"  -> postponed, "A - A" -> abandoned, "C - C" / "V - V" -> cancelled/void
 *   anything else -> unknown (flag to an admin)
 */
export function parseScore(text) {
  const t = clean(text).toUpperCase();
  if (t === 'VS' || t === '') return { status: 'upcoming', homeScore: null, awayScore: null };
  const num = /^(\d+)\s*-\s*(\d+)$/.exec(t);
  if (num) return { status: 'played', homeScore: Number(num[1]), awayScore: Number(num[2]) };
  const codes = { 'X - X': 'played', 'P - P': 'postponed', 'A - A': 'abandoned', 'C - C': 'cancelled', 'V - V': 'cancelled' };
  const norm = t.replace(/\s*-\s*/, ' - ');
  if (codes[norm]) return { status: codes[norm], homeScore: null, awayScore: null };
  return { status: 'unknown', homeScore: null, awayScore: null, rawScore: clean(text) };
}

/** Strip the trailing " - 10:30AM" Full-Time adds to venue text. */
export function cleanVenue(text) {
  const t = clean(text).replace(/\s*-\s*\d{1,2}:\d{2}\s*(AM|PM)?$/i, '');
  return t || null;
}

/**
 * Parse a Full-Time team page.
 * @param {string} html
 * @param {{slug: string, name: string}} team  our team record
 * @returns {Array<object>} fixtures
 */
export function parseTeamPage(html, team) {
  const $ = cheerio.load(html);
  const out = [];
  $('.fixtures-table tbody tr, .results-table tbody tr').each((_, tr) => {
    const tds = $(tr).children('td');
    if (tds.length < 7) return;
    const link = $(tr).find('a[href*="displayFixture.html?id="]').first().attr('href') ?? '';
    const idMatch = /id=(\d+)/.exec(link);
    const dateCell = $(tds[1]);
    const date = parseDate(dateCell.find('span').first().text() || dateCell.text().split(/\s+/)[0]);
    const time = clean(dateCell.find('span').eq(1).text()) || null;
    const home = clean($(tr).find('td.home-team').text());
    const away = clean($(tr).find('td.road-team').text());
    if (!date || !home || !away) return;
    const score = parseScore($(tr).find('td.score').text());
    const venueRaw = cleanVenue($(tds[tds.length - 1]).text());
    const isHome = home.toLowerCase() === team.name.toLowerCase();
    out.push({
      id: idMatch ? `ft-${idMatch[1]}` : `ft-${team.slug}-${date}`,
      teamSlug: team.slug,
      date,
      time,
      type: clean($(tds[0]).text()) || null,
      home,
      away,
      isHome,
      ...score,
      venueRaw,
      source: 'fulltime',
      sourceUrl: link || null,
    });
  });
  return out;
}

/**
 * Merge freshly imported fixtures into the existing list.
 * - Never deletes: Full-Time only shows recent results, so older games must be kept.
 * - Imported fixtures replace the existing record with the same id, or a seed/manual
 *   record for the same team and date.
 * - Manual edits flagged `"locked": true` are never overwritten.
 */
export function mergeFixtures(existing, imported) {
  const list = existing.map((f) => ({ ...f }));
  for (const f of imported) {
    let i = list.findIndex((e) => e.id === f.id);
    if (i === -1) i = list.findIndex((e) => e.source !== 'fulltime' && e.teamSlug === f.teamSlug && e.date === f.date);
    if (i === -1) list.push(f);
    else if (!list[i].locked) list[i] = { ...list[i], ...f, venueRaw: f.venueRaw ?? list[i].venueRaw };
  }
  return list.sort((a, b) => (a.date + (a.time ?? '')).localeCompare(b.date + (b.time ?? '')));
}
