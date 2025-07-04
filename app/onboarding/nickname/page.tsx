// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { OnboardingLayout } from "@/components/ui/onboardingLayout";
// import { motion } from "framer-motion";

// export default function NicknamePage() {
//   const router = useRouter();

//   const handleContinue = () => {
//     if (localNickname.trim()) {
//       router.push("/onboarding/birthdate");
//     }
//   };

//   return (
//     <OnboardingLayout
//       progress={20}
//       title="Your Faithful Match Identity 😎"
//       subtitle="Create a unique nickname that represents you. It's how others will know and remember you."
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="flex flex-col flex-grow"
//       >
//         <Input
//           placeholder="Nickname"
//           value={localNickname}
//           onChange={(e) => setLocalNickname(e.target.value)}
//           className="mb-4 text-lg font-bold h-12"
//         />
//         <div className="flex-grow"></div> {/* Pushes button to bottom */}
//         <Button
//           onClick={handleContinue}
//           disabled={!localNickname.trim()}
//           className="w-full mb-6 p-6 rounded-full"
//         >
//           Continue
//         </Button>
//       </motion.div>
//     </OnboardingLayout>
//   );
// }
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
