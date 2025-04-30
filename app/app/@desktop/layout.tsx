import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/Navbar";
import { getUserProfile } from "@/lib/api/getUserProfile";
import { UserStoreInitializer } from "@/components/client/UserStoreInitializer";

export default async function DesktopHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userProfile = await getUserProfile();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserStoreInitializer profile={userProfile} />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="px-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
