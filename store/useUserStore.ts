import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserProfile } from '@/types/users';

interface UserState {
  profile: UserProfile | null;
  setUsername: (username: string) => void;
  setDateOfBirth: (dob: string) => void;
  setGender: (gender: string) => void;
  setRelationshipGoals: (goals: string) => void;
  setInterests: (interests: string[]) => void;
  setImages: (images: string[]) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  clearProfile: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        profile: null,
        
        setUsername: (username) =>
          set((state) => ({
            profile: { ...state.profile, username } as UserProfile,
          })),
          
        setDateOfBirth: (dateOfBirth) =>
          set((state) => ({
            profile: { ...state.profile, dateOfBirth } as UserProfile,
          })),
          
        setGender: (gender) =>
          set((state) => ({
            profile: { ...state.profile, gender } as UserProfile,
          })),
          
        setRelationshipGoals: (relationshipGoals) =>
          set((state) => ({
            profile: { ...state.profile, relationshipGoals } as UserProfile,
          })),
          
        setInterests: (interests) =>
          set((state) => ({
            profile: { ...state.profile, interests } as UserProfile,
          })),
          
        setImages: (images) =>
          set((state) => ({
            profile: { ...state.profile, images } as UserProfile,
          })),
          
        updateProfile: (partialProfile) =>
          set((state) => ({
            profile: { ...state.profile, ...partialProfile } as UserProfile,
          })),
          
        clearProfile: () => set({ profile: null }),
      }),
      {
        name: 'user-profile-storage',
      }
    )
  )
);

export default useUserStore;