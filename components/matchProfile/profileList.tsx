"use client";
import { useQuery } from "@tanstack/react-query";
import ProfileCard from "./profileCard";
import { fetchProfiles } from "@/lib/api/profiles";

export default function ProfilesList({ userId }: { userId: string }) {
  const { data: profiles, error } = useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => fetchProfiles(userId),
    // Prevent client-side refetch if server data exists
    refetchOnMount: false,
  });

  if (error) {
    return <div className="error">{error.message}</div>;
  }

  console.log(profiles);

  return (
    <div className="profiles-container">
      {profiles?.map((profile) => (
        <ProfileCard key={profile._id} profile={profile} userId={userId} />
      ))}
    </div>
  );
}
