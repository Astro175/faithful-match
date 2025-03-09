// app/interests/page.tsx

import { Metadata } from "next";
import InterestsClient from "@/components/ui/onboarding/interest-client";

export const metadata: Metadata = {
  title: "Discover your interests",
  description:
    "Share your interests, passions, and hobbies. We'll connect you with people who share your enthusiasm.",
};

export default function InterestsPage() {
  return <InterestsClient />;
}
