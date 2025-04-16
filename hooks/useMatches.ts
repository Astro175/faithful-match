// hooks/useMatches.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Match, LikeResponse, DislikeResponse } from "@/types/matches";

// Main matches query
export const useMatches = (userId: string, maxDistance = 100) => {
  return useQuery<Match[]>({
    queryKey: ["matches", userId, maxDistance],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/matching/auto_match",
        { params: { userId, maxDistance, unit: "miles" } }
      );
      return data.matches || [];
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, 
  });
};


const createOptimisticOptions = (queryClient: QueryClient) => ({
  onMutate: async (variables: { userId: string; matchId: string }) => {
    await queryClient.cancelQueries({
      queryKey: ["matches", variables.userId],
    });

    // Get current matches and find the match being acted upon
    const previousMatches =
      queryClient.getQueryData<Match[]>(["matches", variables.userId]) || [];
    const currentMatch = previousMatches.find(
      (m) => m._id === variables.matchId
    );

    if (!currentMatch) {
      throw new Error("Match not found in cache");
    }

    // Optimistically remove from matches
    queryClient.setQueryData<Match[]>(
      ["matches", variables.userId],
      (prev) => prev?.filter((m) => m._id !== variables.matchId) || []
    );

    return { previousMatches, currentMatch };
  },
  onError: (
    err: Error,
    variables: { userId: string; matchId: string },
    context: any
  ) => {
    // Rollback using context from onMutate
    if (context?.previousMatches) {
      queryClient.setQueryData(
        ["matches", variables.userId],
        context.previousMatches
      );
    }
  },
  onSettled: (variables: { userId: string; matchId: string }) => {
    // Invalidate to refresh matches
    queryClient.invalidateQueries({
      queryKey: ["matches", variables.userId],
    });
  },
});

// Like mutation hook
export const useLikeMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      matchId,
    }: {
      userId: string;
      matchId: string;
    }) => {
      const { data } = await axios.get<LikeResponse>(
        "http://localhost:4000/api/likes/like",
        { params: { likerId: userId, likedId: matchId } }
      );
      return data;
    },
    ...createOptimisticOptions(queryClient),
  });
};

export const useDislikeMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      matchId,
    }: {
      userId: string;
      matchId: string;
    }) => {
      const { data } = await axios.get<DislikeResponse>(
        "http://localhost:4000/api/likes/dislike",
        { params: { dislikerId: userId, dislikedId: matchId } }
      );
      return data;
    },
    ...createOptimisticOptions(queryClient),
  });
};
