import type { Metadata, Viewport } from 'next';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { club, teams } from '@/lib/data';

export const metadata: Metadata = {
  metadataBase: new URL(club.siteUrl),
  title: { default: `${club.name} | Youth Football in Castle Bromwich`, template: `%s | ${club.name}` },
  description: `${club.description} FA 1-Star accredited youth football club at ${club.ground.name}, ${club.ground.postcode}. Join the Lions!`,
  keywords: ['youth football club Castle Bromwich', 'kids football B36', 'U8 football Birmingham', 'CWYFL', 'Castle Bromwich Lions'],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: club.name,
    images: [{ url: '/images/og.png', width: 1200, height: 630, alt: club.name }],
  },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#163A7A' },
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: club.name,
  sport: 'Soccer',
  foundingDate: '2024-06',
  url: club.siteUrl,
  logo: `${club.siteUrl}/images/crest.png`,
  sameAs: Object.values(club.social).filter((v) => typeof v === 'string' && v.startsWith('http')),
  memberOf: { '@type': 'SportsOrganization', name: club.league.name },
  location: {
    '@type': 'Place',
    name: club.ground.name,
    address: { '@type': 'PostalAddress', addressLocality: 'Castle Bromwich', addressRegion: 'West Midlands', postalCode: club.ground.postcode, addressCountry: 'GB' },
  },
  subOrganization: teams.map((t) => ({ '@type': 'SportsTeam', name: t.name, sport: 'Soccer', url: `${club.siteUrl}/teams/${t.slug}/` })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
