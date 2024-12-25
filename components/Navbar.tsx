import Image from "next/image";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="border border-[#E0E0E0] px-8 py-2 rounded-full text-white font-semibold text-xl hover:bg-primary focus:bg-primary transition-colors font-outline"
  >
    {children}
  </Link>
);

export const Navbar = () => (
  <nav className="py-12 px-[72px] flex justify-between items-center w-full max-w-7xl mx-auto md:flex-row flex-col gap-4">
    <Image
      src="/logo.png"
      alt="Faithful Match Logo"
      width={150}
      height={40}
      className="h-auto"
    />
    <div className="flex gap-4 md:flex-row flex-col">
      <NavLink href="/pricing">Pricing</NavLink>
      <NavLink href="/language">English</NavLink>
      <NavLink href="/login">Log in</NavLink>
    </div>
  </nav>
);
