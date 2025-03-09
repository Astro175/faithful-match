import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  locationEnabled: boolean;
}

interface OnboardingState {
  nickname: string;
  birthdate: {
    month: string;
    day: string;
    year: string;
  };
  gender: string;
  relationshipGoal: string;
  distance: number;
  interests: string[];
  pictures: string[];
  location: LocationData;

  // Existing setters
  setNickname: (nickname: string) => void;
  setBirthdate: (birthdate: {
    month: string;
    day: string;
    year: string;
  }) => void;
  setGender: (gender: string) => void;
  setRelationshipGoal: (goal: string) => void;
  setDistance: (distance: number) => void;
  setInterests: (interests: string[]) => void;

  // Interest-related functions
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;

  // Picture-related functions
  setPictures: (pictures: string[]) => void;
  addPicture: (picture: string) => void;
  removePicture: (index: number) => void;

  // Location-related functions
  setLocation: (location: LocationData) => void;

  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      nickname: "",
      birthdate: { month: "", day: "", year: "" },
      gender: "",
      relationshipGoal: "",
      distance: 50,
      interests: [],
      pictures: [],
      location: {
        latitude: null,
        longitude: null,
        locationEnabled: false,
      },

      // Existing setters
      setNickname: (nickname) => set({ nickname }),
      setBirthdate: (birthdate) => set({ birthdate }),
      setGender: (gender) => set({ gender }),
      setRelationshipGoal: (goal) => set({ relationshipGoal: goal }),
      setDistance: (distance) => set({ distance }),
      setInterests: (interests) => set({ interests }),

      // Interest-related functions
      addInterest: (interest) =>
        set((state) => ({
          interests: state.interests.includes(interest)
            ? state.interests
            : [...state.interests, interest],
        })),
      removeInterest: (interest) =>
        set((state) => ({
          interests: state.interests.filter((i) => i !== interest),
        })),

      // Picture-related functions
      setPictures: (pictures) => set({ pictures }),
      addPicture: (picture) =>
        set((state) => {
          if (state.pictures.length >= 6) {
            return state;
          }
          return { pictures: [...state.pictures, picture] };
        }),
      removePicture: (index) =>
        set((state) => ({
          pictures: state.pictures.filter((_, i) => i !== index),
        })),

      // Location-related functions
      setLocation: (location) => set({ location }),

      resetOnboarding: () =>
        set({
          nickname: "",
          birthdate: { month: "", day: "", year: "" },
          gender: "",
          relationshipGoal: "",
          distance: 50,
          interests: [],
          pictures: [],
          location: {
            latitude: null,
            longitude: null,
            locationEnabled: false,
          },
        }),
    }),
    {
      name: "onboarding-storage",
      partialize: (state) => ({
        nickname: state.nickname,
        birthdate: state.birthdate,
        gender: state.gender,
        relationshipGoal: state.relationshipGoal,
        distance: state.distance,
        interests: state.interests,
        pictures: state.pictures,
        location: state.location,
      }),
    }
  )
);
