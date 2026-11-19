import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts } from '@/lib/news';
import { club, formatDate } from '@/lib/data';
import { PageHeader, Section, Card } from '@/components/ui';
import FacebookFeed from '@/components/FacebookFeed';

export const metadata: Metadata = { title: 'News', description: `Club news and match reports from ${club.name}.` };

export default function NewsPage() {
  const posts = getPosts();
  return (
    <>
      <PageHeader title="Club news" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Card>
                <p className="text-xs font-semibold uppercase text-lion-red">
                  {p.category} · {formatDate(p.date, { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  <Link href={`/news/${p.slug}/`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">{p.excerpt}</p>
              </Card>
            </li>
          ))}
        </ul>
        <aside>
          <h2 className="mb-3 font-display text-2xl font-bold uppercase">On Facebook</h2>
          <FacebookFeed pageUrl={club.social.facebookPagePluginUrl} shareUrl={club.social.facebook} />
        </aside>
      </div>
    </>
  );
}
