// app/pictures/page.tsx

import { Metadata } from "next";
import PicturesClient from "@/components/ui/onboarding/pictures-client";

export const metadata: Metadata = {
  title: "Select Your Pictures",
  description:
    "Upload up to six of your best photos to make a fantastic first impression.",
};

export default function PicturesPage() {
  return <PicturesClient />;
}
