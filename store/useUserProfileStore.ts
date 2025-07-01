import { Profile } from "@/types/profile";
import { create } from "zustand";

type ProfileStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

export const useProfile = () => useProfileStore((state) => state.profile);
