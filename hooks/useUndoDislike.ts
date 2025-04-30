import { useMutation, useQueryClient } from '@tanstack/react-query';
import { undoDislike } from '@/lib/api/likes';
import { Profile } from '@/types/profiles';

export const useUndoDislike = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dislikedId: string) => {
      // First check if the profile is still available for undo
      const lastDisliked = queryClient.getQueryData<{
        profile: Profile;
        timestamp: number;
      }>(['lastDisliked', userId]);

      if (!lastDisliked || lastDisliked.profile._id !== dislikedId) {
        throw new Error('This action can no longer be undone');
      }

      return undoDislike(userId, dislikedId);
    },
    onMutate: async (dislikedId) => {
      await queryClient.cancelQueries({ queryKey: ['profiles', userId] });

      // Get the profile to restore
      const lastDisliked = queryClient.getQueryData<{
        profile: Profile;
        timestamp: number;
      }>(['lastDisliked', userId]);

      // Optimistically add the profile back
      if (lastDisliked?.profile) {
        queryClient.setQueryData<Profile[]>(
          ['profiles', userId], 
          (old) => old ? [lastDisliked.profile, ...old] : [lastDisliked.profile]
        );
      }

      // Store previous state for rollback
      const previousProfiles = queryClient.getQueryData<Profile[]>(['profiles', userId]);

      return { previousProfiles, lastDisliked };
    },
    onError: (err, dislikedId, context) => {
      // Roll back to previous state
      queryClient.setQueryData(['profiles', userId], context?.previousProfiles);
      
      // Restore the lastDisliked entry if undo failed
      if (context?.lastDisliked) {
        queryClient.setQueryData(
          ['lastDisliked', userId], 
          context.lastDisliked
        );
      }
    },
    onSuccess: () => {
      // Clear the lastDisliked entry after successful undo
      queryClient.removeQueries({ queryKey: ['lastDisliked', userId] });
    },
    onSettled: () => {
      // Refresh data in background
      queryClient.invalidateQueries({ queryKey: ['profiles', userId] });
    }
  });
};