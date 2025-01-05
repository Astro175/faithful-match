import { ReactNode } from "react";

interface NavButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export const NavButton = ({ onClick, children }: NavButtonProps) => (
  <button
    onClick={onClick}
    className="border border-[#E0E0E0] px-8 py-2 rounded-full text-white font-semibold text-xl hover:bg-primary focus:bg-primary transition-colors font-outline"
  >
    {children}
  </button>
);
