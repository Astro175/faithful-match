import { Profile } from "@/types/profiles";

export const fetchProfiles = async (userId: string): Promise<Profile[]> => {
  const url = `http://localhost:4000/api/matching/auto_match?userId=${userId}&maxDistance=100&unit=km`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch matches");
  }

  return data.data.matches;
};
