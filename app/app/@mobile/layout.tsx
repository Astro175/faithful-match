import { ProfileInitializer } from "@/components/ProfileStoreInitializer";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@/types/profile";
import { getProfileById } from "@/services/profileService";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import {
  NotificationButtonClient,
  FilterButtonClient,
} from "@/components/mobile/match/HeaderClient";

export default async function MobileHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  let profile: Profile | null = null;
  if (userId) {
    const data = await getProfileById(userId);
    if (data) {
      profile = {
        ...data,
        dob: data.dob ? data.dob.toISOString() : "", // convert Date to ISO string
        location: data.location
          ? {
              longitude: data.location.longitude,
              latitude: data.location.latitude,
            }
          : undefined,
        sex: data.sex,
        interests: data.interests.map((item) => item.interest),
        attributes: data.attributes
          ? {
              bio: data.attributes.bio ?? undefined,
              weight: data.attributes.weight ?? undefined,
              height: data.attributes.height ?? undefined,
              bloodType: data.attributes.bloodType ?? undefined,
            }
          : undefined,
        religion: data.religion ?? undefined,
        professionalDetails: data.professionalDetails
          ? {
              occupation: data.professionalDetails.occupation ?? undefined,
              currentCompany:
                data.professionalDetails.currentCompany ?? undefined,
              school: data.professionalDetails.school ?? undefined,
              degreeType: data.professionalDetails.degreeType ?? undefined,
              languages: data.professionalDetails.languages.map(
                (lang) => lang.language
              ),
            }
          : undefined,

        lifestyle: data.lifestyle
          ? {
              pets: data.lifestyle.pets ?? undefined,
              drinkingHabits: data.lifestyle.drinkingHabits ?? undefined,
              smokingHabits: data.lifestyle.smokingHabits ?? undefined,
              sleepingHabit: data.lifestyle.sleepingHabit ?? undefined,
              workout: data.lifestyle.workout ?? undefined,
              socialMediaPresence:
                data.lifestyle.socialMediaPresence ?? undefined,
            }
          : undefined,
        preferences: data.preferences
          ? {
              moviePrefs: data.preferences.moviePrefs ?? undefined,
              musicPrefs: data.preferences.musicPrefs ?? undefined,
              travelPrefs: data.preferences.travelPrefs ?? undefined,
              dietaryPrefs: data.preferences.dietaryPrefs ?? undefined,
              bookPrefs: data.preferences.bookPrefs ?? undefined,
            }
          : undefined,
        filterPreferences: data.filterPreferences
          ? {
              relationshipGoal:
                data.filterPreferences.relationshipGoal ?? undefined,
              religion: data.filterPreferences.religion ?? undefined,
              degreeType: data.filterPreferences.degreeType ?? undefined,
              minAge: data.filterPreferences.minAge ?? undefined,
              maxAge: data.filterPreferences.maxAge ?? undefined,
              hasBio: data.filterPreferences.hasBio ?? undefined,
              fallback: data.filterPreferences.fallback ?? undefined,
            }
          : undefined,
        personaDetails: data.personaDetails
          ? {
              zodiacSign: data.personaDetails.zodiacSign ?? undefined,
              personalityType: data.personaDetails.personalityType ?? undefined,
              communicationStyle:
                data.personaDetails.communicationStyle ?? undefined,
              familyPlans: data.personaDetails.familyPlans ?? undefined,
              genotype: data.personaDetails.genotype ?? undefined,
            }
          : undefined,

        lastUserNameChange: data.lastUserNameChange
          ? data.lastUserNameChange.toISOString()
          : undefined,
        blockedContacts: data.blockedContacts.map((c) => c.blockedUserId),
        distance: data.distance ?? undefined,
      };
    }
  }

  return (
    <div>
      {profile && <ProfileInitializer profile={profile} />}
      <div className="flex flex-col min-h-screen bg-white">
        <header className="sticky top-0 bg-white z-10 py-4 px-6 flex justify-between items-center border-b flex-row-reverse">
          <div className="flex gap-4">
            <ClientComponentWrapper>
              <NotificationButtonClient />
            </ClientComponentWrapper>
            <ClientComponentWrapper>
              <FilterButtonClient />
            </ClientComponentWrapper>
          </div>
          <h1 className="text-2xl font-semibold text-[#212121]">Discover</h1>
        </header>
        <main className="flex-1 px-4">{children}</main>
        <MobileBottomNav />
      </div>
    </div>
  );
}

// Wrapper for client components to prevent hydration errors
function ClientComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      {children}
    </div>
  );
}
