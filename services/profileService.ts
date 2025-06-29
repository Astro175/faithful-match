import { Profile } from "@/types/profile";
import { prisma } from "./prismaClient";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

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

    export const createProfile = async (data: Profile) => {
        const profile = await prisma.profile.create({
            data: {
                
            }
        })
    }