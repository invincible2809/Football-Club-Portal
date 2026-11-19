'use client';
import { useEffect, useState } from 'react';

/** Countdown to a UK-local kick-off time. Renders nothing until mounted to avoid hydration mismatch. */
export default function Countdown({ date, time }: { date: string; time: string | null }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);
  if (now == null) return null;
  // Kick-off is UK time; Nov–Mar is GMT, Apr–Oct BST. Work out the offset for that date.
  const local = new Date(`${date}T${time ?? '10:00'}:00Z`);
  const ukHour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hour12: false }).format(local));
  const offsetH = (ukHour - local.getUTCHours() + 24) % 24;
  const target = local.getTime() - offsetH * 3600_000;
  const diff = target - now;
  if (diff <= 0) return <p className="font-display text-xl uppercase text-lion-gold">Kick-off time!</p>;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return (
    <dl className="flex gap-3" aria-label="Time until kick-off">
      {[
        ['days', d],
        ['hrs', h],
        ['mins', m],
      ].map(([label, v]) => (
        <div key={label} className="min-w-16 rounded-lg bg-white/10 px-3 py-2 text-center">
          <dd className="font-display text-3xl font-bold text-lion-gold">{v}</dd>
          <dt className="text-xs uppercase tracking-widest">{label}</dt>
        </div>
      ))}
    </dl>
  );
}
