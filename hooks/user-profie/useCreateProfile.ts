import { useMutation } from "@tanstack/react-query";
import { userProfileService } from "@/services/UserProfileService";
import { Profile } from "@/types/profile";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateProfie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Profile> }) =>
      userProfileService.create(data, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
}
