#!/usr/bin/env node
// Imports fixtures and results for every team in content/teams.json from FA Full-Time
// and merges them into content/fixtures.json. Run daily by .github/workflows/import-fulltime.yml.
// If Full-Time can't be reached for a team, that team's existing fixtures are left untouched.
import { readFile, writeFile } from 'node:fs/promises';
import { parseTeamPage, mergeFixtures } from './lib/fulltime.mjs';

const root = new URL('../', import.meta.url);
const read = async (p) => JSON.parse(await readFile(new URL(p, root), 'utf8'));

const teams = await read('content/teams.json');
let fixtures = await read('content/fixtures.json');
let failures = 0;
const unknown = [];

for (const team of teams) {
  if (!team.fulltimeTeamId) continue;
  const url = team.fulltimeDivisionSeasonId
    ? `https://fulltime.thefa.com/displayTeam.html?divisionseason=${team.fulltimeDivisionSeasonId}&teamID=${team.fulltimeTeamId}`
    : `https://fulltime.thefa.com/displayTeam.html?id=${team.fulltimeTeamId}`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'club-website-fixture-import/1.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const parsed = parseTeamPage(await res.text(), team);
    if (parsed.length === 0) throw new Error('no fixtures found – page layout may have changed');
    unknown.push(...parsed.filter((f) => f.status === 'unknown'));
    fixtures = mergeFixtures(fixtures, parsed);
    console.log(`✔ ${team.name}: ${parsed.length} fixtures`);
  } catch (err) {
    failures++;
    console.warn(`✖ ${team.name}: ${err.message} – keeping existing data`);
  }
}

await writeFile(new URL('content/fixtures.json', root), JSON.stringify(fixtures, null, 2) + '\n');

if (unknown.length) {
  console.warn(`⚠ ${unknown.length} fixture(s) have an unrecognised status code – please check:`);
  for (const f of unknown) console.warn(`  ${f.date} ${f.home} v ${f.away}: "${f.rawScore}"`);
}
if (failures === teams.length) process.exit(1);
