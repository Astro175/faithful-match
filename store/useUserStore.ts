
import { create } from "zustand";
import axios from "axios";

interface Attributes {
  bio: string;
  weight: number;
  height: number;
  blood_type: string;
}

interface ProfessionalDetails {
  occupation: string;
  languages: string[];
}

interface Lifestyle {
  pets: string[];
  drinking_habits: string;
  smoking_habits: string;
  sleeping_habits: string;
  workout: string;
}

interface Preferences {
  movie_prefs: string[];
  music_prefs: string[];
  dietary_prefs: string[];
}

interface PersonaDetails {
  zodiac_sign: string;
}

export interface UserProfile {
  _id: string;
  userId: string;
  user_name: string;
  dob: string;
  sex: string;
  profile_completion_percentage: number;
  relationship_goal: string;
  interests: string[];
  profile_img: string;
  images: string[];
  attributes: Attributes;
  religion: string;
  professionalDetails: ProfessionalDetails;
  lifestyle: Lifestyle;
  preferences: Preferences;
  personaDetails: PersonaDetails;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchUserProfile: (clerkId: string) => Promise<void>;
  setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  fetchUserProfile: async (clerkId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(
        `http://localhost:4000/api/profiles/user?clerkId=${clerkId}`
      );
      const profileData = response.data["profile found =>"];
      set({ profile: profileData, isLoading: false });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      set({ error: "Failed to fetch user profile", isLoading: false });
    }
  },
}));
