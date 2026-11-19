'use client';
import { useState, type FormEvent, type ReactNode } from 'react';

type Props = { name: string; endpoint: string | null; fallback: ReactNode; children: ReactNode; submitLabel?: string };

/**
 * Posts form data to `formEndpoint` from content/club.json (e.g. Formspree, Netlify Forms, Basin).
 * While no endpoint is configured the form is not shown; visitors see `fallback` contact details instead,
 * so no personal data is collected anywhere it can't be stored safely.
 */
export default function Form({ name, endpoint, fallback, children, submitLabel = 'Send' }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  if (!endpoint) return <div className="rounded-xl border border-dashed border-gray-400 p-5 dark:border-gray-600">{fallback}</div>;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);
    data.append('form', name);
    try {
      const res = await fetch(endpoint!, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      setState(res.ok ? 'sent' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent')
    return (
      <p role="status" className="rounded-xl bg-green-100 p-5 text-green-900">
        Thank you – we&apos;ve received your message and a club volunteer will be in touch.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      {state === 'error' && (
        <p role="alert" className="text-lion-red">
          Sorry, something went wrong. Please try again or contact us on Facebook.
        </p>
      )}
      <button type="submit" disabled={state === 'sending'} className="rounded-lg bg-lion-red px-6 py-3 font-display text-lg uppercase text-white hover:bg-lion-redDark disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

export function Field({ label, name, type = 'text', required, hint, as }: { label: string; name: string; type?: string; required?: boolean; hint?: string; as?: 'textarea' }) {
  const cls = 'mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-900';
  return (
    <label className="block text-sm font-semibold">
      {label}
      {required && <span className="text-lion-red"> *</span>}
      {as === 'textarea' ? <textarea name={name} required={required} rows={4} className={cls} /> : <input name={name} type={type} required={required} className={cls} />}
      {hint && <span className="mt-1 block font-normal text-gray-600 dark:text-gray-400">{hint}</span>}
    </label>
  );
}

export function Check({ name, children, required }: { name: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="flex gap-3 text-sm">
      <input type="checkbox" name={name} value="yes" required={required} className="mt-1 h-5 w-5 shrink-0 accent-lion-blue" />
      <span>
        {children}
        {required && <span className="text-lion-red"> *</span>}
      </span>
    </label>
  );
}
