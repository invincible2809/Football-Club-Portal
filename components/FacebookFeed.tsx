'use client';
import { useState } from 'react';

/**
 * Facebook's page plugin sets tracking cookies, so it only loads after the visitor clicks.
 * Needs the page's full URL (facebook.com/<page-name>) in content/club.json → social.facebookPagePluginUrl.
 */
export default function FacebookFeed({ pageUrl, shareUrl }: { pageUrl: string | null; shareUrl: string }) {
  const [show, setShow] = useState(false);
  if (!pageUrl)
    return (
      <p className="text-sm">
        Follow our latest updates on{' '}
        <a className="text-lion-blue underline dark:text-blue-300" href={shareUrl} target="_blank" rel="noopener noreferrer">
          our Facebook page
        </a>
        .
      </p>
    );
  if (!show)
    return (
      <div className="rounded-xl border border-dashed border-gray-400 p-5 text-sm dark:border-gray-600">
        <p>Our Facebook posts are shown using Facebook&apos;s own widget, which sets cookies.</p>
        <button type="button" onClick={() => setShow(true)} className="mt-3 rounded-lg bg-lion-blue px-4 py-2 text-white">
          Load Facebook posts
        </button>
      </div>
    );
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=600&small_header=true&hide_cover=false`;
  return <iframe title="Castle Bromwich Lions FC on Facebook" src={src} width="100%" height="600" className="max-w-[500px] rounded-xl border-0" loading="lazy" allow="encrypted-media" />;
}
