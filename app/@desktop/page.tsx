import { Metadata } from "next";
import { DesktopHomepage } from "@/components/desktop/DesktopHomepage";

export const metadata: Metadata = {
  title: "Faithful Match - Redefine Your Love Life",
  description:
    "Take control and redefine what love means to you with perfect matches on Faithful Match. Download our app today and start your journey to meaningful connections.",
  keywords:
    "dating app, faithful match, relationships, love, dating, signup, create account",
  openGraph: {
    title: "Faithful Match - Redefine Your Love Life",
    description:
      "Take control and redefine what love means to you with perfect matches",
    images: ["/landing_image_one.png"],
    type: "website",
  },
};

export default function DesktopHome() {
  return <DesktopHomepage /> ;
}
