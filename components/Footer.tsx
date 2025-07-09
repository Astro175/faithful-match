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
  <footer
    className={`bg-secondary px-4 md:px-[5.25em] py-8 md:py-[5em] ${className}`}
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between px-4 md:px-12 mb-8">
        <Link
          href="/about"
          className="font-outline font-bold text-black hover:text-primary text-center md:text-left"
        >
          About Us
        </Link>
        <Link
          href="/faq"
          className="font-outline font-bold text-black hover:text-primary text-center md:text-left"
        >
          FAQ
        </Link>
        <Link
          href="/support"
          className="font-outline font-bold text-black hover:text-primary text-center md:text-left"
        >
          Support
        </Link>
        <Link
          href="/terms"
          className="font-outline font-bold text-black hover:text-primary text-center md:text-left"
        >
          Terms & Conditions
        </Link>
        <Link
          href="/policy"
          className="font-outline font-bold text-black hover:text-primary text-center md:text-left"
        >
          Privacy Policy
        </Link>
      </div>
      <div className="h-px bg-primary my-8" />
      <div className="flex flex-col md:flex-row justify-between items-center px-4">
        <p className="font-medium text-black text-center md:text-left">
          ©2024 Faithful Match
        </p>
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
