import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="border border-[#E0E0E0] px-8 py-2 rounded-full text-white font-semibold text-xl hover:bg-primary focus:bg-primary transition-colors font-outline"
  >
    {children}
  </Link>
);
