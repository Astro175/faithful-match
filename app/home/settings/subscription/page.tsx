import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default function ActiveSubscription() {
  const basicFeatures = [
    "Create and Edit Profile",
    "Swipe Match",
    "Limited Daily Swipes",
    "Basic Profile Verification",
    "Chat with Mutual Matches",
  ];

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <h1 className="text-[24px] font-outfit font-bold text-[#212121] text-center mb-8">
        Active Subscription
      </h1>

      <Card className="max-w-[380px] mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-outfit font-bold text-xl">Faith Match</h2>
            <span className="py-2 px-4 rounded-full text-white text-sm font-outfit font-semibold bg-[#BDBDBD]">
              Basic
            </span>
          </div>

          <div className="mb-6">
            <span className="font-outfit font-bold text-[48px]">Free</span>
          </div>

          <div className="space-y-4 mb-6">
            {basicFeatures.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                <p className="font-outfit font-medium text-lg break-words">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <p className="text-[#757575] font-outfit font-semibold text-lg text-center">
            Your current plan
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <div className="bg-[#FAE3E4] p-4 rounded-lg mt-8">
          <p className="font-outfit font-medium text-base text-[#DD101E]">
            Upgrade to Premium to unlock unlimited swipes, priority
            verification, and more!{" "}
            <Link href="/pricing" className="font-semibold hover:underline">
              View our plans
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
