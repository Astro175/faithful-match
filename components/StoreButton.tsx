import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

type StoreButtonProps = {
  type: "apple" | "android";
};

export const StoreButton = ({ type }: StoreButtonProps) => (
  <div className="border border-white rounded-md px-6 p-2 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
    {type === "apple" ? (
      <FaApple size={36} className="text-white" />
    ) : (
      <IoLogoGooglePlaystore size={24} className="text-white" />
    )}
    <div className="flex flex-col">
      <span className="text-white text-sm">Download on the</span>
      <span className="text-white font-semibold">
        {type === "apple" ? "App Store" : "Play Store"}
      </span>
    </div>
  </div>
);
