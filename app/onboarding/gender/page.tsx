// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { OnboardingLayout } from "@/components/ui/onboardingLayout";
// import { useOnboardingStore } from "@/store/onboarding-store";
// import { toast } from "sonner";
// import { FaVenus, FaMars, FaTransgender } from "react-icons/fa";

// const GENDER_OPTIONS = [
//   {
//     value: "woman",
//     label: "Woman",
//     icon: FaVenus,
//   },
//   {
//     value: "man",
//     label: "Man",
//     icon: FaMars,
//   },
//   {
//     value: "non-binary",
//     label: "Non-Binary",
//     icon: FaTransgender,
//   },
// ];

// export default function GenderPage() {
//   const router = useRouter();
//   const { gender, setGender } = useOnboardingStore();
//   const [selectedGender, setSelectedGender] = useState(gender);

//   const handleGenderSelect = (genderValue: string) => {
//     setSelectedGender(genderValue);
//   };

//   const handleContinue = () => {
//     if (!selectedGender) {
//       toast.error("Gender Selection", {
//         description: "Please select a gender to continue",
//       });
//       return;
//     }

//     setGender(selectedGender);
//     router.push("/onboarding/relationship-goals");
//   };

//   return (
//     <OnboardingLayout
//       progress={60}
//       title="Be true to yourself 🌟"
//       subtitle="Choose the gender that best represents you. Authenticity is key to meaningful connections."
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-3 gap-4">
//           {GENDER_OPTIONS.map((option) => {
//             const Icon = option.icon;
//             const isSelected = selectedGender === option.value;

//             return (
//               <motion.div
//                 key={option.value}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   variant={isSelected ? "default" : "outline"}
//                   className={`
//                     w-full h-40 flex flex-col items-center justify-center
//                     space-y-2 transition-all duration-300
//                     ${
//                       isSelected
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-background text-foreground"
//                     }
//                   `}
//                   onClick={() => handleGenderSelect(option.value)}
//                 >
//                   <Icon
//                     size={48}
//                     className={`
//                       transition-colors duration-300
//                       ${
//                         isSelected
//                           ? "text-primary-foreground"
//                           : "text-muted-foreground"
//                       }
//                     `}
//                   />
//                   <span className="text-sm font-medium">{option.label}</span>
//                 </Button>
//               </motion.div>
//             );
//           })}
//         </div>

//         <Button
//           onClick={handleContinue}
//           disabled={!selectedGender}
//           className="w-full"
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
