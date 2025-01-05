import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocialIcon = ({ Icon }: { Icon: React.ComponentType<any> }) => (
  <Icon
    size={16}
    className="text-primary hover:text-secondary transition-colors cursor-pointer"
  />
);

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = "" }: FooterProps) => (
  <footer className={`bg-secondary px-[5.25em] py-[5em] ${className}`}>
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between px-12 mb-8">
        <Link
          href="/about"
          className="font-outline font-bold text-black hover:text-primary"
        >
          About Us
        </Link>
        <Link
          href="/faq"
          className="font-outline font-bold text-black hover:text-primary"
        >
          FAQ
        </Link>
        <Link
          href="/support"
          className="font-outline font-bold text-black hover:text-primary"
        >
          Support
        </Link>
        <Link
          href="/terms"
          className="font-outline font-bold text-black hover:text-primary"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/privacy"
          className="font-outline font-bold text-black hover:text-primary"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="h-px bg-primary my-8" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="font-medium text-black">©2024 Faithful Match</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <SocialIcon Icon={FaFacebookF} />
          <SocialIcon Icon={FaLinkedinIn} />
          <SocialIcon Icon={FaXTwitter} />
          <SocialIcon Icon={FaYoutube} />
          <SocialIcon Icon={FaInstagram} />
        </div>
      </div>
    </div>
  </footer>
);
