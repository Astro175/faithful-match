"use client";

import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Progress } from "./progeress-bar";
import { motion } from "framer-motion";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  progress: number;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

export function OnboardingLayout({
  children,
  progress,
  title,
  subtitle,
  showBackButton = true,
}: OnboardingLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen px-4 py-8 flex flex-col"
    >
      <div className="flex items-center mb-6 gap-6">
        {showBackButton && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="mr-4"
          >
            <FaArrowLeftLong className="text-2xl" />
          </motion.button>
        )}
        <Progress value={progress} className="w-full" />
      </div>

      <div className="text-left mb-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold mb-2"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-600"
        >
          {subtitle}
        </motion.p>
      </div>

      {children}
    </motion.div>
  );
}
