import type { MetadataRoute } from 'next';
import { club } from '@/lib/data';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/admin/' }], sitemap: `${club.siteUrl}/sitemap.xml` };
}
