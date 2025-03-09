import { auth } from "@clerk/nextjs/server";
import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/Navbar";
import { UserStoreInitializer } from "@/components/client/UserStoreInitializer";
import { Providers } from "@/components/ui/providers/providers";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  let profileData = null;

  if (userId) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/profiles/user?clerkId=${userId}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      const data = await response.json();
      profileData = data["profile found =>"];
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <UserStoreInitializer profile={profileData} />
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="px-8">
            <div className="max-w-6xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
