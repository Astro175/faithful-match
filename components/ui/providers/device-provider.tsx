// components/providers/device-provider.tsx
"use client";

import { useEffect, useState } from "react";
import { useDeviceStore } from "@/store/device-store";

interface DeviceProviderProps {
  serverIsMobile?: boolean;
  children: React.ReactNode;
}

export function DeviceProvider({
  serverIsMobile,
  children,
}: DeviceProviderProps) {
  const { isMobile, setMobile } = useDeviceStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Effect for client-side detection
  useEffect(() => {
    // Initialize with server value if available
    if (serverIsMobile !== undefined && !isHydrated) {
      setMobile(serverIsMobile);
    }

    // Set up media query for client-side detection
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setMobile(e.matches);
    };

    // Initial check on mount
    setMobile(mediaQuery.matches);
    setIsHydrated(true);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [serverIsMobile, setMobile]);

  return <>{children}</>;
}
