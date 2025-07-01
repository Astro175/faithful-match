import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/Navbar";
import { ProfileInitializer } from "@/components/ProfileStoreInitializer";
import { createClient } from "@/utils/supabase/server";
import { getProfileById } from "@/services/profileService";
import { Profile } from "@/types/profile";

export default async function DesktopHomeLayout({
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
    <>
      {profile && <ProfileInitializer profile={profile} />}
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </>
  );
}
