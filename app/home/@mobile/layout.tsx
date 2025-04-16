import { UserStoreInitializer } from "@/components/client/UserStoreInitializer";
import { Providers } from "@/components/ui/providers/providers";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import {
  NotificationButtonClient,
  FilterButtonClient,
} from "@/components/mobile/match/HeaderClient";
import { getUserProfile } from "@/lib/getUserProfile"; // New utility

export default async function MobileHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileData = await getUserProfile();

  return (
    <Providers>
      <UserStoreInitializer profile={profileData} />
      <div className="flex flex-col min-h-screen bg-white">
        <header className="sticky top-0 bg-white z-10 py-4 px-6 flex justify-between items-center border-b flex-row-reverse">
          <div className="flex gap-4">
            <ClientComponentWrapper>
              <NotificationButtonClient />
            </ClientComponentWrapper>
            <ClientComponentWrapper>
              <FilterButtonClient />
            </ClientComponentWrapper>
          </div>
          <h1 className="text-2xl font-semibold text-[#212121]">Discover</h1>
        </header>
        <main className="flex-1 px-4">{children}</main>
        <MobileBottomNav />
      </div>
    </Providers>
  );
}

// Wrapper for client components to prevent hydration errors
function ClientComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      {children}
    </div>
  );
}
