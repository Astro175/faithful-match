import Link from "next/link";
import Image from "next/image";

interface DesktopNavbarProps {
  onLogin: () => void;
}

const Logo = () => (
  <Link href="/" className="relative w-[136px] h-[136px]">
    <Image
      src="/logo.png"
      alt="Faithful Match Logo"
      fill
      className="object-contain"
    />
  </Link>
);

export const DesktopNavbar = ({ onLogin }: DesktopNavbarProps) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      <div className="px-12 py-6">
        <div className="flex justify-between items-center">
          <Logo />

          <div className="flex items-center gap-8">
            <div className="px-8 py-2 border-[#E0E0E0] border rounded-full hover:border-0">
              <Link
                href="/pricing"
                className="font-outline text-xl text-white hover:text-primary transition-colors font-semibold"
              >
                Pricing
              </Link>
            </div>
            <button
              onClick={onLogin}
              className="text-lg font-outline font-bold text-white hover:text-primary transition-colors px-8 py-2 border-[#E0E0E0] border rounded-full hover:border-0"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
