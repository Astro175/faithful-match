// // src/components/pages/ProfilePage.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useUserStore } from "@/store/useUserStore";
// import { useAuth } from "@clerk/nextjs";
// import { IoIosMale, IoIosFemale } from "react-icons/io";
// import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";
// import { calculateAge } from "@/lib/utils";
// import { EditProfilePage } from "./EditProfilePage";

// // Circular Progress component
// const CircularProgress = ({ percentage }: { percentage: number }) => {
//   const strokeWidth = 10;
//   const radius = 50;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative w-32 h-32 flex items-center justify-center">
//       <svg className="w-full h-full" viewBox="0 0 120 120">
//         <circle
//           className="text-gray-200"
//           strokeWidth={strokeWidth}
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="60"
//           cy="60"
//         />
//         <circle
//           className="text-white"
//           strokeWidth={strokeWidth}
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           stroke="currentColor"
//           fill="transparent"
//           r={radius}
//           cx="60"
//           cy="60"
//           style={{
//             transition: "stroke-dashoffset 1s ease-in-out",
//           }}
//         />
//       </svg>
//       <span className="absolute font-outfit font-bold text-2xl text-white">
//         {Math.round(percentage)}%
//       </span>
//     </div>
//   );
// };

// // Carousel component
// const ImageCarousel = ({ images }: { images: string[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   return (
//     <div className="relative w-[382px] h-[500px] rounded-lg overflow-hidden">
//       <div
//         className="w-full h-full flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="min-w-full h-full relative">
//             <Image
//               src={image}
//               alt={`User photo ${index + 1}`}
//               fill
//               className="object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-2 h-2 rounded-full ${
//               index === currentIndex ? "bg-[#DD101E]" : "bg-white/50"
//             } transition-all duration-300`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Profile Page component
// export function ProfilePage() {
//   const { profile, isLoading, fetchUserProfile } = useUserStore();
//   const { userId } = useAuth();
//   const [showProfileCard, setShowProfileCard] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       fetchUserProfile(userId);
//     }
//   }, [userId, fetchUserProfile]);

//   if (isLoading) {
//     return <ProfileSkeleton />;
//   }

//   if (!profile) {
//     return <div>No profile data found.</div>;
//   }

//   const age = calculateAge(profile.dob);

//   if (isEditing) {
//     return <EditProfilePage onBack={() => setIsEditing(false)} />;
//   }

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-7xl">
//       <AnimatePresence>
//         {showProfileCard && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="bg-[#DD101E] rounded-[10px] p-4 mb-8 flex items-center justify-between"
//           >
//             <div className="flex flex-1 items-center gap-5">
//               <CircularProgress
//                 percentage={profile.profile_completion_percentage || 0}
//               />
//               <div className="flex flex-col">
//                 <h2 className="font-outfit font-bold text-xl text-white">
//                   Complete your profile
//                 </h2>
//                 <p className="font-outfit font-normal text-white">
//                   Complete your profile to experience the best dating experience
//                   and better matches!
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowProfileCard(false)}
//               className="text-white hover:text-white/80 transition-colors"
//             >
//               <AiOutlineClose size={24} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="flex flex-col md:flex-row gap-8"
//       >
//         <ImageCarousel
//           images={
//             profile.images.length > 0 ? profile.images : [profile.profile_img]
//           }
//         />

//         <div className="flex-1">
//           <h1 className="font-outfit font-bold text-2xl text-foreground mb-2">
//             {profile.firstName} ({age})
//           </h1>

//           <div className="flex items-center gap-3 mb-6">
//             {profile.sex === "male" ? (
//               <IoIosMale size={24} className="text-[#424242]" />
//             ) : (
//               <IoIosFemale size={24} className="text-[#424242]" />
//             )}
//             <span className="font-outfit font-normal text-lg text-[#424242]">
//               {profile.sex === "male" ? "Male" : "Female"}
//             </span>
//           </div>

//           <h2 className="font-outfit font-bold text-xl mb-3">Interests</h2>
//           <div className="flex flex-wrap gap-2 mb-6">
//             {profile.interests.map((interest, index) => (
//               <span
//                 key={index}
//                 className="py-2 px-5 rounded-lg border border-[#E0E0E0] text-sm"
//               >
//                 {interest}
//               </span>
//             ))}
//           </div>

//           <h2 className="font-outfit font-bold text-xl mb-3">Goals</h2>
//           <div className="flex flex-wrap gap-2 mb-8">
//             <span className="py-2 px-5 rounded-lg border border-[#E0E0E0] text-sm">
//               {profile.relationship_goal}
//             </span>
//           </div>

//           <Button
//             onClick={() => setIsEditing(true)}
//             className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full flex items-center gap-2"
//           >
//             <AiOutlineEdit size={18} />
//             Edit Profile
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // Loading skeleton
// function ProfileSkeleton() {
//   return (
//     <div className="container mx-auto py-8 px-4 max-w-7xl">
//       <Skeleton className="w-full h-[130px] rounded-[10px] mb-8" />

//       <div className="flex flex-col md:flex-row gap-8">
//         <Skeleton className="w-[382px] h-[500px] rounded-lg" />

//         <div className="flex-1">
//           <Skeleton className="w-48 h-8 mb-2" />
//           <Skeleton className="w-36 h-6 mb-6" />

//           <Skeleton className="w-32 h-6 mb-3" />
//           <div className="flex flex-wrap gap-2 mb-6">
//             <Skeleton className="w-24 h-10 rounded-lg" />
//             <Skeleton className="w-32 h-10 rounded-lg" />
//             <Skeleton className="w-28 h-10 rounded-lg" />
//           </div>

//           <Skeleton className="w-32 h-6 mb-3" />
//           <div className="flex flex-wrap gap-2 mb-8">
//             <Skeleton className="w-36 h-10 rounded-lg" />
//           </div>

//           <Skeleton className="w-36 h-12 rounded-full" />
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function ProfilePage() {
  return <div>Loading...</div>;
}
