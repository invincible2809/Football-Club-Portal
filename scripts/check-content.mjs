#!/usr/bin/env node
// Lists club details still marked TBD (null) in content/club.json.
// Runs before every build; in GitHub Actions the items show as warnings on the run.
import { readFile } from 'node:fs/promises';

const club = JSON.parse(await readFile(new URL('../content/club.json', import.meta.url), 'utf8'));
const checks = [
  [club.contacts.welfareOfficer, 'Club Welfare Officer (safeguarding – the site shows the Secretary until this is set)', true],
  [club.contacts.treasurer, 'Treasurer'],
  [club.email, 'Club email'],
  [club.fees, 'Fees & subs'],
  [club.paymentUrl, 'Payment method / link'],
  [club.formEndpoint, 'Form endpoint – online forms are hidden until set'],
  [club.social.instagram, 'Instagram link'],
  [club.social.tiktok, 'TikTok link'],
  [club.social.facebookPagePluginUrl, 'Facebook page URL for the news feed'],
  [club.accreditation.date, 'Accreditation date (timeline)'],
];
const missing = checks.filter(([v]) => v == null || v === '');
const gha = process.env.GITHUB_ACTIONS === 'true';
if (missing.length) {
  console.log(`Pending club details (TBD): ${missing.length}`);
  for (const [, label, important] of missing) console.log(gha ? `::warning title=Club detail TBD::${label}` : `  ${important ? '⚠' : '-'} ${label}`);
}
