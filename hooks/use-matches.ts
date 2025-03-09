"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore"; // Assuming this exists

export interface Location {
  lat: number;
  lng: number;
}

export interface Scores {
  distance: number;
  goals: number;
  interests: number;
  total: number;
}

export interface Match {
  id: string;
  userId: string;
  name: string;
  username: string;
  location: Location;
  sex: string;
  goal: string;
  interests: string[];
  profileImg: string;
  images: Array<{ url: string; id: string }>;
  distance: number;
  scores: Scores;
}

interface MatchesResponse {
  success: boolean;
  matches: Match[];
  count: number;
}

export const useMatches = (maxDistance: number = 50, unit: string = "km") => {
  const { profile } = useUserStore();

  return useQuery({
    queryKey: ["matches", profile?.userId, maxDistance, unit],
    queryFn: async (): Promise<MatchesResponse> => {
      if (!profile?.userId) {
        throw new Error("User profile not found");
      }

      const response = await fetch(
        `http://localhost:4000/api/matching/auto_match?userId=${profile.userId}&maxDistance=${maxDistance}&unit=${unit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }

      return response.json();
    },
    enabled: !!profile?.userId,
    refetchOnWindowFocus: false,
  });
};
