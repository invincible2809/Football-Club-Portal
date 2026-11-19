import { fixtures, getTeam } from '@/lib/data';
import { buildCalendar } from '@/lib/ics';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return fixtures.map((f) => ({ file: `${f.id}.ics` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const id = (await params).file.replace(/\.ics$/, '');
  const f = fixtures.find((x) => x.id === id)!;
  const team = getTeam(f.teamSlug);
  return new Response(buildCalendar(`CB Lions ${team?.nickname ?? ''}`, [f]), { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
}
