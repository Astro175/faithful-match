import { Metadata } from 'next';
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/Navbar";
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
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="px-8">
          <div className="max-w-6xl mx-auto">
            <MatchCards />
          </div>
        </main>
      </div>
    </div>
  );
}