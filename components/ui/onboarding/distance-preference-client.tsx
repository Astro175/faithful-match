// "use client";

// import { useEffect, useState } from "react";
// import { useOnboardingStore } from "@/store/onboarding-store";
// import { OnboardingLayout } from "../onboardingLayout";
// import { DistanceSlider } from "./distance-slider";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function DistancePreferenceClient() {
//   const router = useRouter();
//   const { distance, setDistance } = useOnboardingStore();
//   const [isClient, setIsClient] = useState(false);

//   // Handle hydration mismatch between server and client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleDistanceChange = (value: number) => {
//     setDistance(value);
//   };

//   const handleNext = () => {
//     // Navigate to the next page in the onboarding flow
//     router.push("/onboarding/interest");
//   };

//   if (!isClient) {
//     return null; // Avoid rendering with server data before hydration
//   }

//   return (
//     <OnboardingLayout
//       progress={60}
//       title="Find matches nearby📍"
//       subtitle="Select your preferred distance range to discover matches conveniently. We'll help you find love close by."
//     >
//       <div className="flex flex-col gap-8 mt-6">
//         <div className="flex justify-between items-center">
//           <span className="font-bold text-[20px] text-[#212121]">
//             Distance Preference
//           </span>
//           <span className="font-medium text-[20px] text-[#424242]">
//             {distance} km
//           </span>
//         </div>

//         <DistanceSlider value={distance} onChange={handleDistanceChange} />

//         <motion.button
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           onClick={handleNext}
//           className="bg-[#DD101E] text-white font-semibold py-4 rounded-full fixed bottom-9 w-10/12"
//         >
//           Continue
//         </motion.button>
//       </div>
//     </OnboardingLayout>
//   );
// }
import React from 'react'

export default function distancePreferenceClient() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
