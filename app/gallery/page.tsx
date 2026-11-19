/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { gallery, club } from '@/lib/data';
import { PageHeader, Section, Notice } from '@/components/ui';

export const metadata: Metadata = { title: 'Gallery' };

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" intro="Photos from matchdays, training and club events." />
      <Section>
        {gallery.length === 0 ? (
          <Notice>
            Our photo gallery is coming soon. In the meantime, see our latest photos on{' '}
            <a className="underline" href={club.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            .
          </Notice>
        ) : (
          gallery.map((album) => (
            <div key={album.title} className="mb-10">
              <h2 className="mb-3 font-display text-2xl font-bold uppercase">{album.title}</h2>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {album.photos.map((p) => (
                  <li key={p.src}>
                    <a href={p.src} target="_blank" rel="noopener noreferrer">
                      <img src={p.src} alt={p.alt} loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          We only publish photos of children whose parents have given consent, and we never name children in photos. If you&apos;d like a photo
          removed, please contact the club and we&apos;ll take it down straight away.
        </p>
      </Section>
    </>
  );
}
