// app/page.tsx
import { ResponsiveLayout } from "@/components/layouts/responsive-layout";
import DesktopHome from "./@desktop/page";
import MobileHome from "./@mobile/page";
import { cookies } from "next/headers";

export default async function HomePage() {
  // We can still access server-side cookie for SEO optimization
  const cookieStore = await cookies();
  const deviceType = cookieStore.get("device-type")?.value || "desktop";

  // We can perform server-specific logic here based on deviceType if needed
  // For example, prefetching different data for mobile vs desktop

  return (
    <ResponsiveLayout
      mobileComponent={<MobileHome />}
      desktopComponent={<DesktopHome />}
    />
  );
}
