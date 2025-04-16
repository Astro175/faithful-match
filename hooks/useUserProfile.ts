import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "@/types/user";

const fetchUserProfile = async (userId: string) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/profiles/user?clerkId=${userId}`
  );
  return data["profile found =>"] as UserProfile;
};

export const useUserProfile = (clerkId: string) => {
    return useQuery({
        queryKey: ["userProfile", clerkId],
        queryFn: () => fetchUserProfile(clerkId),
        enabled: !!clerkId,
        staleTime: 1000 * 6 *10,
        retry: 2
    });

}