"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";

interface UserStoreInitializerProps {
  profile: any | null;
}

export function UserStoreInitializer({ profile }: UserStoreInitializerProps) {
  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  return null;
}
