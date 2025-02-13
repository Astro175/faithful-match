"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

const HelpSupportPage = () => {
  const router = useRouter();

  const supportItems = [
    {
      label: "FAQ",
      route: "/faq",
    },
    {
      label: "Contact Support",
      route: "/support",
    },
    {
      label: "Terms & Conditions",
      route: "/terms",
    },
    {
      label: "Privacy Policy",
      route: "/policy",
    },
    {
      label: "Feedback",
      route: "/home/settings/support/feedback",
    },
    {
      label: "About Us",
      route: "/about-us",
    },
  ];

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-[24px] font-[700] text-[#212121] text-center font-outfit mb-8">
        Help & Support
      </h1>

      <div className="max-w-[380px] mx-auto">
        {supportItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavigate(item.route)}
            className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="text-[#212121] font-[600] text-[16px] font-outfit">
              {item.label}
            </span>
            <FiChevronRight className="w-6 h-6 text-[#212121]" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HelpSupportPage;
