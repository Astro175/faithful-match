export enum Sex {
  Male = "male",
  Female = "female",
}

export enum Visibility {
  Nobody = "nobody",
  OnlyMatches = "only_matches",
  Everyone = "everyone",
}

export type Profile = {
  userId: string;
  user_name: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  location?: {
    longitude: number;
    latitude: number;
  };
  sex: Sex;
  relationship_goal: string;
  interests: string[];
  profile_img?: string;
  images: {
    url: string;
    id: string;
  }[];
  attributes?: {
    bio?: string;
    weight?: number;
    height?: number;
    blood_type?: string;
  };
  religion?: string;
  professionalDetails?: {
    occupation?: string;
    current_company?: string;
    school?: string;
    degree_type?: string;
    languages?: string[];
  };
  lifestyle?: {
    pets?: string[];
    drinking_habits?: string;
    smoking_habits?: string;
    sleeping_habit?: string;
    workout?: string;
    social_media_presence?: string;
  };
  preferences?: {
    movie_prefs?: string[];
    music_prefs?: string[];
    travel_prefs?: string[];
    dietary_prefs?: string[];
    book_prefs?: string[];
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
    zodiac_sign?: string;
    personality_type?: string;
    communication_style?: string;
    family_plans?: string;
    genotype?: string;
  };
  profile_completion_percentage?: number;
  lastUserNameChange?: string;
  visibility?: Visibility;
  blockedContacts: string[];
  distance?: number;
}
