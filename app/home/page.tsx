"use client";
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function SuccessScreen() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/Finding People Nearby.png"
        alt="Finding People Nearby"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
