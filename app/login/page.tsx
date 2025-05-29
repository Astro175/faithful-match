import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default async function Page() {
  const {userId} = await auth();

  if(userId) {
    redirect('/app')
  }


  return <LoginForm />
}