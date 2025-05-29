import { userProfileService } from "@/services/UserProfileService";
import { useQuery } from "@tanstack/react-query";

export default function useProfile(id: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => userProfileService.getById(id),
    enabled: !!id
  });
}
