import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/public/logo-red.png"
        width={220}
        height={220}
        alt="Faithful Match Logo"
        className="w-52 h-52 animate-pulse"
      />
      <Loader2 className="h-8 w-8 animate-spin"/>
    </div>
  );
}
