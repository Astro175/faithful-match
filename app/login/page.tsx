import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default async function Page() {
  return <LoginForm />
}