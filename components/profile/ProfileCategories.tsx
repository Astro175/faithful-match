import { IoIosArrowForward } from "react-icons/io";
import { Profile } from "./types";
import Image from "next/image";

interface CategoryItem {
  key: string;
  label: string;
  icon: string;
}

interface ProfileCategoriesProps {
  title: string;
  items: CategoryItem[];
  onItemClick: (key: string) => void;
  profile: Profile;
}

export const ProfileCategories = ({
  title,
  items,
  onItemClick,
  profile,
}: ProfileCategoriesProps) => {
  const getValue = (item: CategoryItem): string => {
    switch (item.key) {
      case "zodiac":
        return profile.personaDetails?.zodiac_sign || "";
      case "blood":
        return profile.attributes?.blood_type || "";
      case "education":
        return profile.professionalDetails?.occupation || "";
      case "pets":
        return profile.lifestyle?.pets?.join(", ") || "";
      case "drinking":
        return profile.lifestyle?.drinking_habits || "";
      case "smoking":
        return profile.lifestyle?.smoking_habits || "";
      case "workout":
        return profile.lifestyle?.workout || "";
      case "diet":
        return profile.preferences?.dietary_prefs?.join(", ") || "";
      case "sleeping":
        return profile.lifestyle?.sleeping_habits || "";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-6 mb-8">
      <h2 className="font-outfit font-bold text-[20px] text-[#212121] mb-4">
        {title}
      </h2>
      <div className="border-b border-[#EEEEEE] mb-6" />
      <div className="space-y-4">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onItemClick(item.key)}
            type="button"
            className="flex justify-between items-center w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.icon}
                alt={item.label}
                className="w-5 h-5"
                width={30}
                height={30}
              />
              <span className="font-outfit font-medium text-[18px] text-[#212121]">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-outfit font-medium text-[#9E9E9E]">
                {getValue(item) || "Select"}
              </span>
              <IoIosArrowForward className="text-[#9E9E9E] w-5 h-5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
