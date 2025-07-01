"use server";

import { createProfile } from "@/services/profileService";
import { CreateProfileInput } from "@/services/profileService";
import { Visibility } from "@prisma/client";

import { Sex } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData: FormData) {
  console.log(formData);
  try {
    const userId = formData.get("userId") as string;
    const userName = formData.get("userName") as string;
    const firstName = formData.get("firstName") as string;
    const dob = formData.get("dob") as string;
    const sex = formData.get("sex") as Sex;
    const relationshipGoal = formData.get("relationshipGoal") as string;
    const religion = formData.get("religion") as string;
    const profileCompletionPercentage = 55;
    const lastUserNameChange = formData.get("lastUserNameChange") as string;
    const visibility = formData.get("visibility") as Visibility;
    const distance = formData.get("distance") as string;

    if (!userId || !userName || !firstName || !dob || !sex) {
      throw new Error("Missing required fields");
    }

    const longitude = formData.get("longitude") as string;
    const latitude = formData.get("latitude") as string;
    const location =
      longitude && latitude
        ? {
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
          }
        : undefined;
    const interestsString = formData.get("interests") as string;
    const interests = interestsString
      ? interestsString.split(",").map((i) => i.trim())
      : [];

    const imagesString = formData.get("images") as string;
    const images = imagesString
      ? imagesString.split(",").map((url) => ({ url: url.trim() }))
      : undefined;

    const bio = formData.get("bio") as string;
    const weight = formData.get("weight") as string;
    const height = formData.get("height") as string;
    const bloodType = formData.get("bloodType") as string;
    const attributes =
      bio || weight || height || bloodType
        ? {
            bio: bio || undefined,
            weight: weight ? parseFloat(weight) : undefined,
            height: height ? parseFloat(height) : undefined,
            bloodType: bloodType || undefined,
          }
        : undefined;

    const occupation = formData.get("occupation") as string;
    const currentCompany = formData.get("currentCompany") as string;
    const school = formData.get("school") as string;
    const degreeType = formData.get("degreeType") as string;
    const languagesString = formData.get("languages") as string;
    const languages = languagesString
      ? languagesString.split(",").map((l) => l.trim())
      : undefined;

    const professionalDetails =
      occupation || currentCompany || school || degreeType || languages
        ? {
            occupation: occupation || undefined,
            currentCompany: currentCompany || undefined,
            school: school || undefined,
            degreeType: degreeType || undefined,
            languages: languages,
          }
        : undefined;

    const petsString = formData.get("pets") as string;
    const pets = petsString
      ? petsString.split(",").map((p) => p.trim())
      : undefined;
    const drinkingHabits = formData.get("drinkingHabits") as string;
    const smokingHabits = formData.get("smokingHabits") as string;
    const sleepingHabit = formData.get("sleepingHabit") as string;
    const workout = formData.get("workout") as string;
    const socialMediaPresence = formData.get("socialMediaPresence") as string;

    const lifestyle =
      pets ||
      drinkingHabits ||
      smokingHabits ||
      sleepingHabit ||
      workout ||
      socialMediaPresence
        ? {
            pets,
            drinkingHabits: drinkingHabits || undefined,
            smokingHabits: smokingHabits || undefined,
            sleepingHabit: sleepingHabit || undefined,
            workout: workout || undefined,
            socialMediaPresence: socialMediaPresence || undefined,
          }
        : undefined;

    // Extract preferences
    const moviePrefsString = formData.get("moviePrefs") as string;
    const moviePrefs = moviePrefsString
      ? moviePrefsString.split(",").map((p) => p.trim())
      : undefined;
    const musicPrefsString = formData.get("musicPrefs") as string;
    const musicPrefs = musicPrefsString
      ? musicPrefsString.split(",").map((p) => p.trim())
      : undefined;
    const travelPrefsString = formData.get("travelPrefs") as string;
    const travelPrefs = travelPrefsString
      ? travelPrefsString.split(",").map((p) => p.trim())
      : undefined;
    const dietaryPrefsString = formData.get("dietaryPrefs") as string;
    const dietaryPrefs = dietaryPrefsString
      ? dietaryPrefsString.split(",").map((p) => p.trim())
      : undefined;
    const bookPrefsString = formData.get("bookPrefs") as string;
    const bookPrefs = bookPrefsString
      ? bookPrefsString.split(",").map((p) => p.trim())
      : undefined;

    const preferences =
      moviePrefs || musicPrefs || travelPrefs || dietaryPrefs || bookPrefs
        ? {
            moviePrefs,
            musicPrefs,
            travelPrefs,
            dietaryPrefs,
            bookPrefs,
          }
        : undefined;

    // Extract filter preferences
    const minAge = formData.get("minAge") as string;
    const maxAge = formData.get("maxAge") as string;
    const filterRelationshipGoal = formData.get(
      "filterRelationshipGoal"
    ) as string;
    const filterReligion = formData.get("filterReligion") as string;
    const filterDegreeType = formData.get("filterDegreeType") as string;
    const hasBio = formData.get("hasBio") as string;
    const fallback = formData.get("fallback") as string;

    const filterPreferences =
      minAge ||
      maxAge ||
      filterRelationshipGoal ||
      filterReligion ||
      filterDegreeType ||
      hasBio ||
      fallback
        ? {
            minAge: minAge ? parseInt(minAge) : undefined,
            maxAge: maxAge ? parseInt(maxAge) : undefined,
            relationshipGoal: filterRelationshipGoal || undefined,
            religion: filterReligion || undefined,
            degreeType: filterDegreeType || undefined,
            hasBio:
              hasBio === "true" ? true : hasBio === "false" ? false : undefined,
            fallback:
              fallback === "true"
                ? true
                : fallback === "false"
                ? false
                : undefined,
          }
        : undefined;

    const zodiacSign = formData.get("zodiacSign") as string;
    const personalityType = formData.get("personalityType") as string;
    const communicationStyle = formData.get("communicationStyle") as string;
    const familyPlans = formData.get("familyPlans") as string;
    const genotype = formData.get("genotype") as string;

    const personaDetails =
      zodiacSign ||
      personalityType ||
      communicationStyle ||
      familyPlans ||
      genotype
        ? {
            zodiacSign: zodiacSign || undefined,
            personalityType: personalityType || undefined,
            communicationStyle: communicationStyle || undefined,
            familyPlans: familyPlans || undefined,
            genotype: genotype || undefined,
          }
        : undefined;

    const profileData: CreateProfileInput = {
      userId,
      userName,
      firstName,
      dob: new Date(dob),
      sex,
      relationshipGoal,
      religion,
      profileCompletionPercentage,
      lastUserNameChange: lastUserNameChange
        ? new Date(lastUserNameChange)
        : undefined,
      visibility,
      distance: distance ? parseInt(distance) : undefined,
      location,
      interests,
      images,
      attributes,
      professionalDetails,
      lifestyle,
      preferences,
      filterPreferences,
      personaDetails,
    };

    const profile = await createProfile(profileData);

    revalidatePath("/profile-registration");

    return {
      success: true,
      profile,
      message: "Profile created successfully",
    };
  } catch (error) {
    console.error("Profile creation error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create profile",
    };
  }
}

export async function createProfileActionWithRedirect(formData: FormData) {
  try {
    const result = await createProfileAction(formData);

    if (result.success) {
      redirect("/app");
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create profile",
    };
  }
}
