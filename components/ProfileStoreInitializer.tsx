'use client';
import { Profile } from '@/types/profile';
import { useProfileStore } from '@/store/useUserProfileStore';

import { useEffect } from 'react';

type ProfileInitializerProps = {
  profile: Profile;
};


export function ProfileInitializer({ profile }: ProfileInitializerProps) {
  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    setProfile(profile);
  }, [profile, setProfile]);

  return null;
}