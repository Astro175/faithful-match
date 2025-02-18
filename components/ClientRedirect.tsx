"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";

export default function ClientRedirect({
  deviceTypeFromServer,
}: {
  deviceTypeFromServer?: string;
}) {
//   const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const isMobileClient = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const isMobile = deviceTypeFromServer
      ? deviceTypeFromServer === "mobile"
      : isMobileClient;

    document.documentElement.setAttribute(
      "data-device",
      isMobile ? "mobile" : "desktop"
    );

    setIsLoading(false);
  }, [deviceTypeFromServer, isMobileClient]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return null;
}
