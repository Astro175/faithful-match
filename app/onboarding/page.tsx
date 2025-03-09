"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first onboarding step
    router.push("/onboarding/nickname");
  }, [router]);

  return null;
}
