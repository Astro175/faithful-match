import { create } from "zustand";
import axios from "axios";

export interface Match {
  _id: string;
  userId: string;
  user_name: string;
  firstName: string;
  lastName: string;
  location: {
    longitude: number;
    latitude: number;
  };
  sex: string;
  relationship_goal: string;
  interests: string[];
  profile_img: {
    url: string;
    id: string;
  };
  images: Array<{
    url: string;
    id: string;
  }>;
  distance: number;
  distanceScore: number;
  goalsScore: number;
  interestScore: number;
  totalScore: number;
}

interface LikeResponse {
  match: boolean;
  like: {
    likerId: string;
    likedId: string;
    status: "pending" | "matched";
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

interface DislikeResponse {
  dislike: {
    likerId: string;
    likedId: string;
    status: "dislike";
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}
interface MatchesState {
  matches: Match[];
  currentMatchIndex: number;
  likedMatches: Match[];
  dislikedMatches: Match[];
  isLoading: boolean;
  error: string | null;
  lastMatch: {
    match: boolean;
    isMatch: boolean;
  } | null;

  // Methods
  fetchMatches: (userId: string, maxDistance?: number) => Promise<void>;
  likeCurrentMatch: (likerId: string, likedId: string) => Promise<void>;
  dislikeCurrentMatch: (
    dislikerId: string,
    dislikedId: string
  ) => Promise<void>;
  refreshDislikedMatch: () => void;
  resetMatches: () => void;
}

export const useMatchesStore = create<MatchesState>((set, get) => ({
  matches: [],
  currentMatchIndex: 0,
  likedMatches: [],
  dislikedMatches: [],
  isLoading: false,
  error: null,
  lastMatch: null,

  fetchMatches: async (userId, maxDistance = 100) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `http://localhost:4000/api/matching/auto_match`,
        {
          params: {
            userId,
            maxDistance,
            unit: "miles",
          },
        }
      );

      const fetchedMatches = response.data.matches || [];

      set({
        matches: fetchedMatches,
        currentMatchIndex: 0,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching matches:", error);
      set({
        error: "Failed to fetch matches",
        isLoading: false,
      });
    }
  },

  likeCurrentMatch: async (likerId, likedId) => {
    const { matches, currentMatchIndex, likedMatches } = get();
    const currentMatch = matches[currentMatchIndex];

    // Optimistic update BEFORE API call
    set({
      likedMatches: [...likedMatches, currentMatch],
      currentMatchIndex: currentMatchIndex + 1,
      // Temporary lastMatch state
      lastMatch: {
        match: false,
        isMatch: false,
      },
    });

    try {
      const response = await axios.get<LikeResponse>(
        `http://localhost:4000/api/likes/like`,
        {
          params: {
            likerId,
            likedId,
          },
        }
      );

      // Update with backend response
      set({
        lastMatch: {
          match: response.data.match,
          isMatch: response.data.match,
        },
      });
    } catch (error) {
      console.error("Failed to like match:", error);

      // Rollback: Remove the optimistically added match
      set((state) => ({
        likedMatches: state.likedMatches.filter(
          (match) => match._id !== currentMatch._id
        ),
        currentMatchIndex: currentMatchIndex,
        lastMatch: null,
        error: "Failed to like match",
      }));
    }
  },

  dislikeCurrentMatch: async (dislikerId, dislikedId) => {
    const { matches, currentMatchIndex, dislikedMatches } = get();
    const currentMatch = matches[currentMatchIndex];

    // Optimistic update BEFORE API call
    set({
      dislikedMatches: [...dislikedMatches, currentMatch],
      currentMatchIndex: currentMatchIndex + 1,
    });

    try {
      await axios.get<DislikeResponse>(
        `http://localhost:4000/api/likes/dislike`,
        {
          params: {
            dislikerId,
            dislikedId,
          },
        }
      );
    } catch (error) {
      console.error("Failed to dislike match:", error);

      // Rollback
      set((state) => ({
        dislikedMatches: state.dislikedMatches.filter(
          (match) => match._id !== currentMatch._id
        ),
        currentMatchIndex: currentMatchIndex,
        error: "Failed to dislike match",
      }));
    }
  },

  refreshDislikedMatch: () => {
    const { dislikedMatches } = get();

    if (dislikedMatches.length > 0) {
      const lastDislikedMatch = dislikedMatches[dislikedMatches.length - 1];

      set((state) => ({
        matches: [lastDislikedMatch, ...state.matches],
        dislikedMatches: state.dislikedMatches.slice(0, -1),
        currentMatchIndex: 0,
      }));
    }
  },

  resetMatches: () => {
    set({
      matches: [],
      currentMatchIndex: 0,
      likedMatches: [],
      dislikedMatches: [],
      lastMatch: null,
    });
  },
}));
