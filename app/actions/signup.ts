"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignUpState } from "@/types";


export async function SignUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Email is required");
  }
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http:localhost:3000/app",
    },
  });
  if (error) {
    redirect("/error");
  }
  return { success: true, error: "" };
}
