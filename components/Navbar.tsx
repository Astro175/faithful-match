import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NavButton } from "./NavButton";
import { NavLink } from "./NavLink";

interface NavbarProps {
  onLogin?: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navbar = ({ onLogin, isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <nav className="py-6 md:py-12 px-4 md:px-[72px]">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {!isMobile && (
          <Image
            src="/logo.png"
            alt="Faithful Match Logo"
            width={150}
            height={40}
            className="h-auto"
          />
        )}

        {isMobile ? (
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <Menu size={24} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  className="fixed inset-0 bg-black bg-opacity-95 z-50 p-4"
                >
                  <div className="flex flex-col gap-4 mt-16">
                    <Link
                      href="/pricing"
                      className="text-white text-lg font-outfit py-2"
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/language"
                      className="text-white text-lg font-outfit py-2"
                    >
                      English
                    </Link>
                    <button
                      onClick={onLogin}
                      className="text-white text-lg font-outfit py-2 text-left"
                    >
                      Log in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex gap-4">
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/language">English</NavLink>
            <NavButton onClick={onLogin}>Log in</NavButton>
          </div>
        )}
      </div>
    </nav>
  );
};
