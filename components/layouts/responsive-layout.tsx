"use client";

import { useDeviceStore } from "@/store/device-store";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ResponsiveLayoutProps {
  mobileComponent: React.ReactNode;
  desktopComponent: React.ReactNode;
}

export function ResponsiveLayout({
  mobileComponent,
  desktopComponent,
}: ResponsiveLayoutProps) {
  const { isMobile } = useDeviceStore();
  const [mounted, setMounted] = useState(false);

  // Only show content after first mount to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null on first render to avoid hydration mismatch
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div
          key="mobile"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {mobileComponent}
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {desktopComponent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
