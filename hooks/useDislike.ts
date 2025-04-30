import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleDislike } from '@/lib/api/likes';
import { Profile } from '@/types/profiles';

export const useDislikeProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dislikedId: string) => handleDislike(userId, dislikedId),
    onMutate: async (dislikedId) => {
      // Cancel any outgoing refetches to prevent overwrites
      await queryClient.cancelQueries({ queryKey: ['profiles', userId] });

      // Snapshot the previous value
      const previousProfiles = queryClient.getQueryData<Profile[]>(['profiles', userId]);
      const dislikedProfile = previousProfiles?.find(p => p._id === dislikedId);

      // Optimistically remove the profile from the list
      queryClient.setQueryData<Profile[]>(
        ['profiles', userId], 
        (old) => old?.filter(p => p._id !== dislikedId) || []
      );

      // Store the disliked profile for possible undo
      if (dislikedProfile) {
        queryClient.setQueryData(
          ['lastDisliked', userId], 
          { profile: dislikedProfile, timestamp: Date.now() }
        );
      }

      return { previousProfiles, dislikedProfile };
    },
    onError: (err, dislikedId, context) => {
      // Roll back to the previous state
      queryClient.setQueryData(['profiles', userId], context.previousProfiles);
      
      // Remove the invalid lastDisliked entry
      queryClient.removeQueries({ queryKey: ['lastDisliked', userId] });
    },
    onSettled: () => {
      // Invalidate to refresh data in background
      queryClient.invalidateQueries({ queryKey: ['profiles', userId] });
    }
  });
};