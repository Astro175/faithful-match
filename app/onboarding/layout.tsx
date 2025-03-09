import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faithful Match - Onboarding",
  description: "Create your unique profile and find meaningful connections",
  openGraph: {
    title: "Faithful Match Onboarding",
    description: "Start your journey to meaningful connections",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
