// app/location/page.tsx

import { Metadata } from "next";
import LocationClient from "@/components/ui/onboarding/location-client";

export const metadata: Metadata = {
  title: "Enable Location",
  description:
    "Allow Faithful Match to access your location to find matches nearby.",
};

export default function LocationPage() {
  return <LocationClient />;
}
