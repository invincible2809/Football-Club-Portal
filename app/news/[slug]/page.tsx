import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPosts, getPost } from '@/lib/news';
import { club, formatDate } from '@/lib/data';
import { PageHeader, Section } from '@/components/ui';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { type: 'article', title: p.title, description: p.excerpt } } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const share = encodeURIComponent(`${club.siteUrl}/news/${post.slug}/`);
  return (
    <>
      <PageHeader kicker={post.category} title={post.title} intro={formatDate(post.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} />
      <Section>
        <article className="prose-club max-w-3xl space-y-4 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold">Share:</span>
          <a className="rounded bg-lion-blue px-3 py-2 text-white" href={`https://www.facebook.com/sharer/sharer.php?u=${share}`} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a className="rounded bg-green-700 px-3 py-2 text-white" href={`https://wa.me/?text=${encodeURIComponent(post.title)}%20${share}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <Link href="/news/" className="ml-auto underline">
            ← All news
          </Link>
        </div>
      </Section>
    </>
  );
}
