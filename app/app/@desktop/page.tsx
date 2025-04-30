import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/queryClient";
import ProfilesList from "@/components/matchProfile/profileList";
import { fetchProfiles } from "@/lib/api/profiles";
import { getUserProfile } from "@/lib/api/getUserProfile";
// import { redirect } from "next/navigation";

export default async function ProfilesPage() {
  const queryClient = createQueryClient();

  const userProfile = await getUserProfile();

  // if (!userProfile?._id) {
  //   redirect("/login");
  // }

  await queryClient.prefetchQuery({
    queryKey: ["profiles", userProfile.userId],
    queryFn: () => fetchProfiles(userProfile.userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfilesList userId={userProfile.userId} />
    </HydrationBoundary>
  );
}
