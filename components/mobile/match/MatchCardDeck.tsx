// "use client";

// import React, { useEffect } from "react";
// import NextImage from "next/image";
// import { useMatchesStore } from "@/store/match-store";
// import { useUserStore } from "@/store/useUserStore";
// import { MatchCard } from "./MatchCard";
// import { MatchActionButtons } from "./MatchActionsButtons";

// export const MatchCardDeck: React.FC = () => {
//   const { profile } = useUserStore();
//   const {
//     matches,
//     currentMatchIndex,
//     likeCurrentMatch,
//     dislikeCurrentMatch,
//     fetchMatches,
//   } = useMatchesStore();

//   useEffect(() => {
//     if (profile?._id) {
//       fetchMatches(profile._id);
//     }
//   }, [profile, fetchMatches]);
//   if (!profile?._id || currentMatchIndex >= matches.length) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100 p-6">
//         <div className="w-32 h-32 mb-6 relative">
//           <NextImage
//             src="/empty-state.svg"
//             alt="No more matches"
//             fill
//             className="object-contain"
//           />
//         </div>
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
//           {!profile?._id ? "Loading Profile" : "No more matches"}
//         </h2>
//         <p className="text-gray-500 text-center px-4 mb-6">
//           {!profile?._id
//             ? "Fetching your profile..."
//             : "Check back later for new matches or adjust your filters"}
//         </p>
//         {profile?._id && (
//           <button
//             className="px-8 py-4 bg-[#DD101E] text-white rounded-full text-lg font-medium"
//             onClick={() => fetchMatches(profile._id)}
//           >
//             Refresh Matches
//           </button>
//         )}
//       </div>
//     );
//   }

//   const currentMatch = matches[currentMatchIndex];

//   return (
//     <div className="relative w-full">
//       <MatchCard
//         match={currentMatch}
//         onSwipeLeft={() =>
//           profile?._id && dislikeCurrentMatch(profile._id, currentMatch._id)
//         }
//         onSwipeRight={() =>
//           profile?._id && likeCurrentMatch(profile._id, currentMatch._id)
//         }
//         onSwipeUp={() => {
//           // Optional: Add any specific up swipe behavior
//         }}
//         onRefresh={() => profile?._id && fetchMatches(profile._id)}
//       />

//       <div className="absolute bottom-0 left-0 right-0 flex justify-center">
//         <MatchActionButtons
//           onPrevious={() => {
//             // Optional: Implement previous match logic
//           }}
//           onNext={() =>
//             profile?._id && dislikeCurrentMatch(profile._id, currentMatch._id)
//           }
//           onRefresh={() => profile?._id && fetchMatches(profile._id)}
//           onLike={() =>
//             profile?._id && likeCurrentMatch(profile._id, currentMatch._id)
//           }
//           onDislike={() =>
//             profile?._id && dislikeCurrentMatch(profile._id, currentMatch._id)
//           }
//           onHot={() => {
//             // Implement hot logic if available
//           }}
//         />
//       </div>
//     </div>
//   );
// };
import React from 'react'

export default function MatchCardDeck() {
  return (
    <div>
      Loading...
    </div>
  )
}
