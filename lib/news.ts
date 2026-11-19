import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type Post = { slug: string; title: string; date: string; category: string; excerpt: string; image: string | null; sample: boolean; html: string };

const dir = path.join(process.cwd(), 'content/news');

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title ?? 'Untitled'),
        date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ''),
        category: String(data.category ?? 'Club news'),
        excerpt: String(data.excerpt ?? ''),
        image: data.image ? String(data.image) : null,
        sample: Boolean(data.sample),
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);
