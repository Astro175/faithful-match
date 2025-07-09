import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/server";
import { getProfileById } from "@/services/profileService";
import { redirect } from "next/navigation";

const DesktopHomepage = dynamic(
  () =>
    import("@/components/desktop/DesktopHomepage").then((mod) => ({
      default: mod.DesktopHomepage,
    })),
  {
    loading: () => <div>Loading</div>,
  }
);
const MobileHomepage = dynamic(
  () =>
    import("@/components/mobile/MobileHomepage").then((mod) => ({
      default: mod.MobileHomepage,
    })),
  {
    loading: () => <div>Loading...</div>,
  }
);

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (userId) {
    const profile = await getProfileById(userId);
    if (!profile) {
      redirect("/profile-registration");
    }
    redirect("/app");
  }

  return (
    <>
      <div className="hidden md:block">
        <DesktopHomepage />
      </div>
      <div className="block md:hidden">
        <MobileHomepage />
      </div>
    </>
  );
}
