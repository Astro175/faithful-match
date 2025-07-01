import { Button } from "@/components/ui/button";
import { IoLanguageOutline } from "react-icons/io5";
import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Create Your Christian Dating Profile | Faithful Match",
  description:
    "Join Faithful Match - Create your profile and connect with Christian singles seeking God-centered relationships. Start your journey to a faithful marriage today!",
  keywords: [
    "Christian dating site",
    "Faithful Match",
    "Christian singles",
    "Christian profile registration",
    "faith-based dating",
    "Christian marriage",
    "Christian relationships",
    "Christian matchmaking",
    "religious dating site",
    "Christian soulmate",
  ],
  openGraph: {
    title: "Create Your Christian Dating Profile | Faithful Match",
    description:
      "Join our community of faithful singles. Create your profile on Faithful Match and connect with Christians who share your values and beliefs.",
    url: "https://www.faithfulmatch.com/profile-registration",
    siteName: "Faithful Match",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Faithful Match - Christian Dating Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Christian Dating Profile | Faithful Match",
    description:
      "Start your journey to a God-centered relationship. Register your profile on Faithful Match today!",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://www.faithfulmatch.com/profile-registration",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center px-4 py-2 border-b-2 border-[#F5F5F5]">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo-red.png"
            alt="Faithful Match Logo"
            width={120}
            height={120}
          />
        </Link>
        <Button
          variant="outline"
          className="border border-[#212121] rounded-full px-6 py-3"
        >
          <span className="font-outfit font-semibold text-xl flex items-center gap-2">
            <IoLanguageOutline /> English 🇺🇸
          </span>
        </Button>
      </div>
    </nav>
  );
};

const ProfileRegistration = async () => {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <RegistrationForm userId={userId}/>
      <Footer />
    </div>
  );
};

export default ProfileRegistration;
