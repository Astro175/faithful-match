import { Metadata } from 'next';

import { MatchCards } from "@/components/ui/match-card";

export const metadata: Metadata = {
  title: 'Match - Find Your Perfect Connection',
  description: 'Discover meaningful connections with our intelligent matching platform. Meet exciting people nearby and start your journey today.',
  openGraph: {
    title: 'Match - Find Your Perfect Connection',
    description: 'Discover meaningful connections with our intelligent matching platform.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Match - Find Your Perfect Connection',
    description: 'Discover meaningful connections with our intelligent matching platform.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://yourdomain.com/match',
  },
};



export default function HomePage() {
  return <MatchCards />;
}
