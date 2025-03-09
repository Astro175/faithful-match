// app/onboarding/distance/page.tsx
import { Metadata } from "next";
import DistancePreferenceClient from "@/components/ui/onboarding/distance-preference-client";

export const metadata: Metadata = {
  title: "Distance Preference | Find Matches Nearby",
  description:
    "Set your preferred distance range to discover matches conveniently",
};

export default function DistancePage() {
  return <DistancePreferenceClient />;
}
