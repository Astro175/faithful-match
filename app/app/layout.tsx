import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { getProfileById } from "@/services/profileService";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  desktop,
  mobile,
}: {
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    redirect("/");
  }

  const profile = getProfileById(userId);

  if (!profile) {
    redirect("/profile-registration");
  }

  return (
    <div className="w-full h-screen">
      <div className="hidden md:block">{desktop}</div>
      <div className="block md:hidden">{mobile}</div>
    </div>
  );
}
