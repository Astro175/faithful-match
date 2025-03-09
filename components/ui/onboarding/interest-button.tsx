// components/ui/interest-button.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";

interface InterestButtonProps {
  interest: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function InterestButton({
  interest,
  isSelected,
  onClick,
  disabled = false,
}: InterestButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled && !isSelected}
      className={`
        px-5 py-2 rounded-full transition-all duration-300
        ${
          isSelected
            ? "bg-destructive/10 text-destructive border border-destructive font-medium"
            : "bg-white border border-[#E0E0E0] text-gray-700 hover:bg-gray-50"
        }
        ${
          disabled && !isSelected
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        }
      `}
    >
      {interest}
    </motion.button>
  );
}
