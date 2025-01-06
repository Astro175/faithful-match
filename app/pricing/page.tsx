import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Plans | Faithful Match",
  description:
    "Choose from our Basic, Premium, Gold, or Platinum membership plans to enhance your faith-based dating experience.",
  keywords:
    "faith match pricing, christian dating plans, religious dating subscription",
  openGraph: {
    title: "Faith Match Pricing Plans",
    description: "Find your perfect match with our premium dating features",
    type: "website",
    url: "https://faithmatch.com/pricing",
    siteName: "Faith Match",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Faith Match Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faith Match Pricing Plans",
    description: "Find your perfect match with our premium dating features",
    images: ["/twitter-image.jpg"],
  },
};

import { FaCheck } from "react-icons/fa";
import Image from "next/image";

const pricingData = [
  {
    subscription: "Basic",
    color: "#BDBDBD",
    price: "Free",
    features: [
      "Create and Edit Profile",
      "Swipe Match",
      "Limited Daily Swipes",
      "Basic Profile Verification",
      "Chat with Mutual Matches",
    ],
  },
  {
    subscription: "Premium",
    color: "#DD101E",
    price: "$9.99",
    period: "month",
    features: [
      "All Free Membership Features",
      "Unlimited Daily Swipes",
      "Priority Profile Verification",
      "Ad-Free Experience",
      "See Who Likes Your Profile",
      "Access to Read Receipts",
      "Rewind Swipes (Undo)",
      "Advanced Matching Filters",
      "Boost Profile Visibility",
      "In-App Customer Support",
    ],
  },
  {
    subscription: "Gold",
    color: "#D99101",
    price: "$24.99",
    period: "quarter",
    features: [
      "All Premium Membership Features",
      "Exclusive Gold Badge on Profile",
      "Additional Super Likes",
      "Premium Customer Support",
      "Access to User Activity Insights",
      "Top-of-Stack Profile Placement",
      "Travel Mode (Change Location)",
      "Access to All Emojis and Stickers",
    ],
  },
  {
    subscription: "Platinum",
    color: "#92A1CF",
    price: "$89.99",
    period: "year",
    features: [
      "All Gold Membership Features",
      "VIP Platinum Badge on Profile",
      "Priority Customer Support",
      "Profile Highlight (Stand Out)",
      "Extended Location Preferences",
      "Profile Boost Credits",
      "Exclusive Access to Faithful Match Events",
      "Advanced Safety Features",
      "Access to Premium Blog Content",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4">
        <Image
          src="/logo-red.png"
          alt="Faith Match"
          // className="h-8"
          width={140}
          height={130}
        />
      </nav>

      <main className="px-8 pb-8">
        <h1 className="font-outfit font-bold text-[30px] mb-8 text-center">
          Upgrade membership
        </h1>

        <div className="flex justify-center gap-4">
          {pricingData.map((plan) => (
            <div
              key={plan.subscription}
              className="w-[300px] bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-outfit font-bold text-xl">Faith Match</h2>
                <span
                  className="py-2 px-4 rounded-full text-white text-sm font-outfit font-semibold"
                  style={{ backgroundColor: plan.color }}
                >
                  {plan.subscription}
                </span>
              </div>

              <div className="mb-6">
                <span className="font-outfit font-bold text-[48px]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="font-outfit font-semibold text-lg">
                    /{plan.period}
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-6">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <p className="font-outfit font-medium text-lg break-words">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {plan.subscription === "Basic" ? (
                <p className="font-outfit font-bold text-center">
                  Your current plan
                </p>
              ) : (
                <div className="space-y-2">
                  {plan.subscription === "Premium" && (
                    <button className="w-full py-3 bg-[#FAE3E4] text-[#DD101E] rounded-full font-outfit font-bold">
                      Start Free Trial
                    </button>
                  )}
                  <button
                    className="w-full py-3 rounded-full text-white font-outfit font-bold"
                    style={{ backgroundColor: plan.color }}
                  >
                    Select Plan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
