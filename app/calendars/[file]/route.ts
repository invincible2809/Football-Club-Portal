import { teams, fixtures, club } from '@/lib/data';
import { buildCalendar } from '@/lib/ics';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [...teams.map((t) => ({ file: `${t.slug}.ics` })), { file: 'all.ics' }];
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const slug = (await params).file.replace(/\.ics$/, '');
  const team = teams.find((t) => t.slug === slug);
  const list = team ? fixtures.filter((f) => f.teamSlug === slug) : fixtures;
  const name = team ? `CB Lions ${team.ageGroup} ${team.nickname}` : `${club.name} – all teams`;
  return new Response(buildCalendar(name, list), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
}
