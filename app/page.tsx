import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/server";
import { getProfileById } from "@/services/profileService";
import { redirect } from "next/navigation";

const DesktopHome = dynamic(() => import("./@desktop/page"), {
  loading: () => <div>Loading</div>,
});
const MobileHome = dynamic(() => import("./@mobile/page"), {
  loading: () => <div>Loading...</div>,
});

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  if (!userId) {
    redirect("/");
  }
  const profile = await getProfileById(userId);
  if (!profile) {
    redirect("/profile-registration");
  }
  redirect("/app");
  return (
    <>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
      <div className="block md:hidden">
        <MobileHome />
      </div>
    </>
  );
}
