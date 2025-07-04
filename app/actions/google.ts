"use server";


import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export async function Google() {
  console.log("clicked");
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  if (data.url) {
    redirect(data.url);
  }
}
