/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile } from "@/types/profile";
import { Visibility } from "@prisma/client";
import { Sex } from "@prisma/client";
import { prisma } from "./prismaClient";

import { redirect } from "next/navigation";

export type CreateProfileInput = {
  userId: string;
  userName: string;
  firstName: string;
  dob: Date;
  sex: Sex;
  relationshipGoal: string;
  religion?: string;
  profileCompletionPercentage: number;
  lastUserNameChange?: Date;
  visibility?: Visibility;
  distance?: number;
  location?: {
    longitude: number;
    latitude: number;
  };
  interests: string[];
  images?: {
    url: string;
  }[];
  attributes?: {
    bio?: string;
    weight?: number;
    height?: number;
    bloodType?: string;
  };
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
};

export const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId: id },
    include: {
      location: true,
      images: true,
      attributes: true,
      professionalDetails: {
        include: {
          languages: true,
        },
      },
      lifestyle: true,
      preferences: true,
      filterPreferences: true,
      personaDetails: true,
      interests: true,
      blockedContacts: true,
    },
  });

  if (!profile) {
    redirect("/profile-registration");
  }

  return profile;
};

export const createProfile = async (
  data: CreateProfileInput
): Promise<Profile> => {
  try {
    const profile = await prisma.profile.create({
      data: {
        userId: data.userId,
        userName: data.userName,
        firstName: data.firstName,
        dob: data.dob,
        sex: data.sex,
        relationshipGoal: data.relationshipGoal,
        religion: data.religion,
        profileCompletionPercentage: data.profileCompletionPercentage,
        lastUserNameChange: data.lastUserNameChange,
        visibility: data.visibility,
        distance: data.distance,
        location: data.location
          ? {
              create: {
                longitude: data.location.longitude,
                latitude: data.location.latitude,
              },
            }
          : undefined,

        interests: {
          create: data.interests.map((interest) => ({
            interest,
          })),
        },

        images: data.images
          ? {
              create: data.images.map((image) => ({
                url: image.url,
              })),
            }
          : undefined,

        attributes: data.attributes
          ? {
              create: {
                bio: data.attributes.bio,
                weight: data.attributes.weight,
                height: data.attributes.height,
                bloodType: data.attributes.bloodType,
              },
            }
          : undefined,

        professionalDetails: data.professionalDetails
          ? {
              create: {
                occupation: data.professionalDetails.occupation,
                currentCompany: data.professionalDetails.currentCompany,
                school: data.professionalDetails.school,
                degreeType: data.professionalDetails.degreeType,
                languages: data.professionalDetails.languages
                  ? {
                      create: data.professionalDetails.languages.map(
                        (language) => ({
                          language,
                        })
                      ),
                    }
                  : undefined,
              },
            }
          : undefined,

        lifestyle: data.lifestyle
          ? {
              create: {
                pets: data.lifestyle.pets,
                drinkingHabits: data.lifestyle.drinkingHabits,
                smokingHabits: data.lifestyle.smokingHabits,
                sleepingHabit: data.lifestyle.sleepingHabit,
                workout: data.lifestyle.workout,
                socialMediaPresence: data.lifestyle.socialMediaPresence,
              },
            }
          : undefined,

        preferences: data.preferences
          ? {
              create: {
                moviePrefs: data.preferences.moviePrefs,
                musicPrefs: data.preferences.musicPrefs,
                travelPrefs: data.preferences.travelPrefs,
                dietaryPrefs: data.preferences.dietaryPrefs,
                bookPrefs: data.preferences.bookPrefs,
              },
            }
          : undefined,

        filterPreferences: data.filterPreferences
          ? {
              create: {
                minAge: data.filterPreferences.minAge,
                maxAge: data.filterPreferences.maxAge,
                relationshipGoal: data.filterPreferences.relationshipGoal,
                religion: data.filterPreferences.religion,
                degreeType: data.filterPreferences.degreeType,
                hasBio: data.filterPreferences.hasBio,
                fallback: data.filterPreferences.fallback,
              },
            }
          : undefined,

        personaDetails: data.personaDetails
          ? {
              create: {
                zodiacSign: data.personaDetails.zodiacSign,
                personalityType: data.personaDetails.personalityType,
                communicationStyle: data.personaDetails.communicationStyle,
                familyPlans: data.personaDetails.familyPlans,
                genotype: data.personaDetails.genotype,
              },
            }
          : undefined,
      },
      include: {
        location: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        attributes: true,
        professionalDetails: {
          include: {
            languages: {
              select: {
                language: true,
              },
            },
          },
        },
        lifestyle: true,
        preferences: true,
        filterPreferences: true,
        personaDetails: true,
        interests: {
          select: {
            interest: true,
          },
        },
        blockedContacts: {
          select: {
            blockedUserId: true,
          },
        },
      },
    });
    return transformPrismaProfileToProfile(profile);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }
    throw new Error("Failed to create profile: Unknown error");
  }
};

export const updateProfile = async (
  userId: string, // Note: using userId since that's your @id field
  data: Partial<CreateProfileInput> // Use input type, not Profile type
): Promise<Profile> => {
  try {
    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        // Direct field updates
        ...(data.userName && { userName: data.userName }),
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.dob && { dob: data.dob }),
        ...(data.sex && { sex: data.sex }),
        ...(data.relationshipGoal && {
          relationshipGoal: data.relationshipGoal,
        }),
        ...(data.religion !== undefined && { religion: data.religion }),
        ...(data.profileCompletionPercentage !== undefined && {
          profileCompletionPercentage: data.profileCompletionPercentage,
        }),
        ...(data.lastUserNameChange !== undefined && {
          lastUserNameChange: data.lastUserNameChange,
        }),
        ...(data.visibility && { visibility: data.visibility }),
        ...(data.distance !== undefined && { distance: data.distance }),

        // Nested relation updates
        ...(data.location && {
          location: {
            upsert: {
              create: {
                longitude: data.location.longitude,
                latitude: data.location.latitude,
              },
              update: {
                longitude: data.location.longitude,
                latitude: data.location.latitude,
              },
            },
          },
        }),

        ...(data.interests && {
          interests: {
            deleteMany: {}, // Remove all existing interests
            create: data.interests.map((interest) => ({
              interest,
            })),
          },
        }),

        ...(data.images && {
          images: {
            deleteMany: {}, // Remove all existing images
            create: data.images.map((image) => ({
              url: image.url,
            })),
          },
        }),

        ...(data.attributes && {
          attributes: {
            upsert: {
              create: {
                bio: data.attributes.bio,
                weight: data.attributes.weight,
                height: data.attributes.height,
                bloodType: data.attributes.bloodType,
              },
              update: {
                bio: data.attributes.bio,
                weight: data.attributes.weight,
                height: data.attributes.height,
                bloodType: data.attributes.bloodType,
              },
            },
          },
        }),

        ...(data.professionalDetails && {
          professionalDetails: {
            upsert: {
              create: {
                occupation: data.professionalDetails.occupation,
                currentCompany: data.professionalDetails.currentCompany,
                school: data.professionalDetails.school,
                degreeType: data.professionalDetails.degreeType,
                languages: data.professionalDetails.languages
                  ? {
                      create: data.professionalDetails.languages.map(
                        (language) => ({
                          language,
                        })
                      ),
                    }
                  : undefined,
              },
              update: {
                occupation: data.professionalDetails.occupation,
                currentCompany: data.professionalDetails.currentCompany,
                school: data.professionalDetails.school,
                degreeType: data.professionalDetails.degreeType,
                languages: data.professionalDetails.languages
                  ? {
                      deleteMany: {},
                      create: data.professionalDetails.languages.map(
                        (language) => ({
                          language,
                        })
                      ),
                    }
                  : undefined,
              },
            },
          },
        }),

        ...(data.lifestyle && {
          lifestyle: {
            upsert: {
              create: {
                pets: data.lifestyle.pets,
                drinkingHabits: data.lifestyle.drinkingHabits,
                smokingHabits: data.lifestyle.smokingHabits,
                sleepingHabit: data.lifestyle.sleepingHabit,
                workout: data.lifestyle.workout,
                socialMediaPresence: data.lifestyle.socialMediaPresence,
              },
              update: {
                pets: data.lifestyle.pets,
                drinkingHabits: data.lifestyle.drinkingHabits,
                smokingHabits: data.lifestyle.smokingHabits,
                sleepingHabit: data.lifestyle.sleepingHabit,
                workout: data.lifestyle.workout,
                socialMediaPresence: data.lifestyle.socialMediaPresence,
              },
            },
          },
        }),

        ...(data.preferences && {
          preferences: {
            upsert: {
              create: {
                moviePrefs: data.preferences.moviePrefs,
                musicPrefs: data.preferences.musicPrefs,
                travelPrefs: data.preferences.travelPrefs,
                dietaryPrefs: data.preferences.dietaryPrefs,
                bookPrefs: data.preferences.bookPrefs,
              },
              update: {
                moviePrefs: data.preferences.moviePrefs,
                musicPrefs: data.preferences.musicPrefs,
                travelPrefs: data.preferences.travelPrefs,
                dietaryPrefs: data.preferences.dietaryPrefs,
                bookPrefs: data.preferences.bookPrefs,
              },
            },
          },
        }),

        ...(data.filterPreferences && {
          filterPreferences: {
            upsert: {
              create: {
                minAge: data.filterPreferences.minAge,
                maxAge: data.filterPreferences.maxAge,
                relationshipGoal: data.filterPreferences.relationshipGoal,
                religion: data.filterPreferences.religion,
                degreeType: data.filterPreferences.degreeType,
                hasBio: data.filterPreferences.hasBio,
                fallback: data.filterPreferences.fallback,
              },
              update: {
                minAge: data.filterPreferences.minAge,
                maxAge: data.filterPreferences.maxAge,
                relationshipGoal: data.filterPreferences.relationshipGoal,
                religion: data.filterPreferences.religion,
                degreeType: data.filterPreferences.degreeType,
                hasBio: data.filterPreferences.hasBio,
                fallback: data.filterPreferences.fallback,
              },
            },
          },
        }),

        ...(data.personaDetails && {
          personaDetails: {
            upsert: {
              create: {
                zodiacSign: data.personaDetails.zodiacSign,
                personalityType: data.personaDetails.personalityType,
                communicationStyle: data.personaDetails.communicationStyle,
                familyPlans: data.personaDetails.familyPlans,
                genotype: data.personaDetails.genotype,
              },
              update: {
                zodiacSign: data.personaDetails.zodiacSign,
                personalityType: data.personaDetails.personalityType,
                communicationStyle: data.personaDetails.communicationStyle,
                familyPlans: data.personaDetails.familyPlans,
                genotype: data.personaDetails.genotype,
              },
            },
          },
        }),
      },
      include: {
        location: true,
        images: {
          select: {
            id: true,
            url: true,
          },
        },
        attributes: true,
        professionalDetails: {
          include: {
            languages: {
              select: {
                language: true,
              },
            },
          },
        },
        lifestyle: true,
        preferences: true,
        filterPreferences: true,
        personaDetails: true,
        interests: {
          select: {
            interest: true,
          },
        },
        blockedContacts: {
          select: {
            blockedUserId: true,
          },
        },
      },
    });

    return transformPrismaProfileToProfile(profile);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
    throw new Error("Failed to update profile: Unknown error");
  }
};

const transformPrismaProfileToProfile = (profile: any): Profile => {
  return {
    userId: profile.userId,
    userName: profile.userName,
    firstName: profile.firstName,
    dob: profile.dob.toISOString(),
    location: profile.location
      ? {
          longitude: profile.location.longitude,
          latitude: profile.location.latitude,
        }
      : undefined,
    sex: profile.sex as Sex,
    relationshipGoal: profile.relationshipGoal,
    interests: profile.interests.map((i: any) => i.interest),
    profileImg: profile.images[0]?.url,
    images: profile.images.map((img: any) => ({
      id: img.id,
      url: img.url,
    })),
    attributes: profile.attributes
      ? {
          bio: profile.attributes.bio ?? undefined,
          weight: profile.attributes.weight ?? undefined,
          height: profile.attributes.height ?? undefined,
          bloodType: profile.attributes.bloodType ?? undefined,
        }
      : undefined,
    religion: profile.religion ?? undefined,
    professionalDetails: profile.professionalDetails
      ? {
          occupation: profile.professionalDetails.occupation ?? undefined,
          currentCompany:
            profile.professionalDetails.currentCompany ?? undefined,
          school: profile.professionalDetails.school ?? undefined,
          degreeType: profile.professionalDetails.degreeType ?? undefined,
          languages: profile.professionalDetails.languages.map(
            (l: any) => l.language
          ),
        }
      : undefined,
    lifestyle: profile.lifestyle
      ? {
          pets: profile.lifestyle.pets ?? undefined,
          drinkingHabits: profile.lifestyle.drinkingHabits ?? undefined,
          smokingHabits: profile.lifestyle.smokingHabits ?? undefined,
          sleepingHabit: profile.lifestyle.sleepingHabit ?? undefined,
          workout: profile.lifestyle.workout ?? undefined,
          socialMediaPresence:
            profile.lifestyle.socialMediaPresence ?? undefined,
        }
      : undefined,
    preferences: profile.preferences
      ? {
          moviePrefs: profile.preferences.moviePrefs ?? undefined,
          musicPrefs: profile.preferences.musicPrefs ?? undefined,
          travelPrefs: profile.preferences.travelPrefs ?? undefined,
          dietaryPrefs: profile.preferences.dietaryPrefs ?? undefined,
          bookPrefs: profile.preferences.bookPrefs ?? undefined,
        }
      : undefined,
    filterPreferences: profile.filterPreferences
      ? {
          minAge: profile.filterPreferences.minAge ?? undefined,
          maxAge: profile.filterPreferences.maxAge ?? undefined,
          relationshipGoal:
            profile.filterPreferences.relationshipGoal ?? undefined,
          religion: profile.filterPreferences.religion ?? undefined,
          degreeType: profile.filterPreferences.degreeType ?? undefined,
          hasBio: profile.filterPreferences.hasBio ?? undefined,
          fallback: profile.filterPreferences.fallback ?? undefined,
        }
      : undefined,
    personaDetails: profile.personaDetails
      ? {
          zodiacSign: profile.personaDetails.zodiacSign ?? undefined,
          personalityType: profile.personaDetails.personalityType ?? undefined,
          communicationStyle:
            profile.personaDetails.communicationStyle ?? undefined,
          familyPlans: profile.personaDetails.familyPlans ?? undefined,
          genotype: profile.personaDetails.genotype ?? undefined,
        }
      : undefined,
    profileCompletionPercentage:
      profile.profileCompletionPercentage ?? undefined,
    lastUserNameChange: profile.lastUserNameChange?.toISOString(),
    visibility: profile.visibility as Visibility,
    blockedContacts: profile.blockedContacts.map((bc: any) => bc.blockedUserId),
    distance: profile.distance ?? undefined,
  };
};
