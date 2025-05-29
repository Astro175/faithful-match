import { Profile } from "@/types/profile";
import { create } from "zustand";

type userProfileState = {
  userProfile: Partial<Profile>;
  setUserProfile: (data: Partial<Profile>) => void;
};

export const useUserProfileStore = () =>
  create<userProfileState>((set) => ({
    userProfile: {},
    setUserProfile: (data: Partial<Profile>) =>
      set((state) => ({
        userProfile: {
          ...state.userProfile,
          ...data,
        },
      })),
  }));
