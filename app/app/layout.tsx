
import { ReactNode } from "react";

export default function HomeLayout({
  desktop,
  mobile,
}: {
  desktop: ReactNode;
  mobile: ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <div className="hidden md:block">{desktop}</div>
      <div className="block md:hidden">{mobile}</div>
    </div>
  );
}
