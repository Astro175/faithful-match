import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";
import { TinderCardDeckClient } from "@/components/tinder-card-deck-client";

export const metadata: Metadata = {
  title: "Match - Find Your Perfect Connection",
  description:
    "Discover meaningful connections with our intelligent matching platform. Meet exciting people nearby and start your journey today.",
  openGraph: {
    title: "Match - Find Your Perfect Connection",
    description:
      "Discover meaningful connections with our intelligent matching platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Match - Find Your Perfect Connection",
    description:
      "Discover meaningful connections with our intelligent matching platform.",
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
    canonical: "https://yourdomain.com/match",
  },
};

export default function MatchPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-center text-3xl font-bold mb-8">Find Your Match</h1>
      <Suspense fallback={<Loading />}>
        <TinderCardDeckClient />
      </Suspense>
    </main>
  );
}
