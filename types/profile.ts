import { Sex } from "@prisma/client";
import { Visibility } from "@prisma/client";


export type Profile = {
  userId: string;
  userName: string;
  firstName?: string;
  dob?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
  sex: Sex | null;
  relationshipGoal: string;
  interests: string[];
  profileImg?: string;
  images: {
    url: string;
    id: string;
  }[];
  attributes?: {
    bio?: string;
    weight?: number;
    height?: number;
    bloodType?: string;
  };
  religion?: string;
  professionalDetails?: {
    occupation?: string;
    currentCompany?: string;
    school?: string;
    degreeType?: string;
    languages?: string[];
  };
  lifestyle?: {
    pets?: string[];
    drinkingHabits?: string;
    smokingHabits?: string;
    sleepingHabit?: string;
    workout?: string;
    socialMediaPresence?: string;
  };
  preferences?: {
    moviePrefs?: string[];
    musicPrefs?: string[];
    travelPrefs?: string[];
    dietaryPrefs?: string[];
    bookPrefs?: string[];
  };
  filterPreferences?: {
    minAge?: number;
    maxAge?: number;
    relationshipGoal?: string;
    religion?: string;
    degreeType?: string;
    hasBio?: boolean;
    fallback?: boolean;
  };
  personaDetails?: {
    zodiacSign?: string;
    personalityType?: string;
    communicationStyle?: string;
    familyPlans?: string;
    genotype?: string;
  };
  profileCompletionPercentage?: number;
  lastUserNameChange?: string;
  visibility?: Visibility;
  blockedContacts: string[];
  distance?: number;
};
