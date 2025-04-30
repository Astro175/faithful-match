import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleLike } from "@/lib/api/likes"
import { Profile } from "@/types/profiles";

export const useLikeProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (likedId: string) => handleLike(userId, likedId),
    onMutate: async (likedId) => {
      await queryClient.cancelQueries({ queryKey: ["profiles", userId] });

      const previousProfiles = queryClient.getQueryData<Profile[]>([
        "profiles",
        userId,
      ]);

      queryClient.setQueryData<Profile[]>(
        ["profiles", userId],
        (old) => old?.filter((p) => p._id !== likedId) || []
      );

      return { previousProfiles };
    },
    onError: (err, likedId, context) => {
      queryClient.setQueryData(["profiles", userId], context?.previousProfiles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles", userId] });
    },
  });
};
