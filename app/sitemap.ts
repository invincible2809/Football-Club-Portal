import type { MetadataRoute } from 'next';
import { club, teams } from '@/lib/data';
import { getPosts } from '@/lib/news';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = club.siteUrl;
  const pages = ['', 'teams', 'fixtures', 'tables', 'news', 'gallery', 'join', 'volunteer', 'safeguarding', 'sponsors', 'about', 'contact', 'privacy'];
  return [
    ...pages.map((p) => ({ url: `${base}/${p ? `${p}/` : ''}` })),
    ...teams.map((t) => ({ url: `${base}/teams/${t.slug}/` })),
    ...getPosts().map((p) => ({ url: `${base}/news/${p.slug}/`, lastModified: p.date })),
  ];
}
