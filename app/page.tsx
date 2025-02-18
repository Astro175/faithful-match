import ClientRedirect from "@/components/ClientRedirect";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const deviceType = cookieStore.get("device-type")?.value || "desktop";

  return <ClientRedirect deviceTypeFromServer={deviceType} />;
}
