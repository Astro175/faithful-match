import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { StoreButton } from "../StoreButton";

interface MobileNavbarProps {
  onLogin: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
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

const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const MobileNavbar = ({
  onLogin,
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavbarProps) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 z-50"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/95 pt-24 px-6"
          >
            <div className="flex flex-col items-center gap-8">
              <Link
                href="/pricing"
                className="font-outline font-bold text-2xl text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <button
                onClick={() => {
                  onLogin();
                  setIsMenuOpen(false);
                }}
                className="font-outline font-bold text-2xl text-white hover:text-primary transition-colors"
              >
                Login
              </button>

              <div className="mt-8 flex flex-col gap-4 w-full max-w-xs">
                <StoreButton type="apple" />
                <StoreButton type="android" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
