import { useMutation } from "@tanstack/react-query";
import { Profile } from "@/types/profile";
import { userProfileService } from "@/services/UserProfileService";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Profile> }) =>
      userProfileService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}
