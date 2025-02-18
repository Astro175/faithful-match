export interface Profile {
  userId: string;
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  pronouns: string;
  attributes: {
    height?: number;
    weight?: number;
    bio?: string;
    religion?: string;
    relationshipGoal?: string;
    interests?: string[];
    blood_type?: string;
  };
  professionalDetails: {
    occupation?: string;
    languages?: string[];
  };
  images: string[];
  lifestyle: {
    pets?: string[];
    drinking_habits?: string;
    smoking_habits?: string;
    workout?: string;
    sleeping_habits?: string;
  };
  preferences: {
    dietary_prefs?: string[];
  };
  personaDetails: {
    zodiac_sign?: string;
  };
}

export interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  pronouns: string;
  height: string;
  weight: string;
  jobTitle: string;
  company: string;
  school: string;
  city: string;
  bio: string;
}
