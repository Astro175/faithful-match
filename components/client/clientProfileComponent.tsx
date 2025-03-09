"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";

export function ClientProfileComponent() {
  const { profile, isLoading } = useUserStore();

  useEffect(() => {
    if (!isLoading && profile) {
      // Hide the skeleton when real data is loaded
      const skeletonContainer = document.getElementById(
        "profile-skeleton-container"
      );
      if (skeletonContainer) {
        skeletonContainer.style.display = "none";
      }
    }
  }, [isLoading, profile]);

  if (isLoading || !profile) {
    return null; // Don't render anything when loading - the skeleton will be shown
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={profile.profile_img || "/avatar.png"}
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <p className="font-medium">@{profile.user_name}</p>
        <p className="text-sm text-gray-500">Profile</p>
      </div>
    </div>
  );
}
