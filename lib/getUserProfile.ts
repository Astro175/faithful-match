import { auth } from "@clerk/nextjs/server";

export async function getUserProfile() {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    return null;
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/profiles/user?clerkId=${userId}`,
      {
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const data = await response.json();
    return data["profile found =>"];
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
