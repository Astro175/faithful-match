import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { userService } from "@/services/userService";
import { userProfileService } from "@/services/UserProfileService";
import { User } from "@/types/user";
import { Profile } from "@/types/profile";



export async function requireUserProfile(): Promise<Profile | null > {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }

  const clerkUser = await currentUser();
  const email =
    clerkUser?.emailAddresses.find((e) => e.emailAddress)?.emailAddress ??
    clerkUser?.primaryEmailAddress?.emailAddress ??
    "";

  let  user: User | null = null;
  try {
    const all = await userService.getAll();
    user = all.find((u: Partial<User>) => u.clerkId === userId) ?? null;
  } catch {
  }
  if (!user) {
    user = await userService.create({ clerkId: userId, email });
  }

  let profile: Profile | null = null
  let profileExists = false;
  try {
    profile = await userProfileService.getById(userId);
    profileExists = true;
  } catch {
  }
  if (!profileExists) {
    return redirect("/create-profile");
  }

  return profile;
}
