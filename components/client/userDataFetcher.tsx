"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@clerk/nextjs";

export function UserDataFetcher() {
  const { fetchUserProfile } = useUserStore();
  const { userId } = useAuth();
  console.log(userId);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId, fetchUserProfile]);

  return null;
}
