// // components/match/match-card.tsx
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { useSpring, animated } from "@react-spring/web";
// import { useDrag } from "@use-gesture/react";
// import { Match } from "@/store/match-store";

// interface MatchCardProps {
//   match: Match;
//   onSwipeLeft: () => void;
//   onSwipeRight: () => void;
//   onSwipeUp?: () => void;
//   onRefresh?: () => void;
// }

// export const MatchCard: React.FC<MatchCardProps> = ({
//   match,
//   onSwipeLeft,
//   onSwipeRight,
//   onSwipeUp,
// }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const cardRef = useRef<HTMLDivElement>(null);

//   // Card spring animation
//   const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

//   // Reset image index when match changes
//   useEffect(() => {
//     setCurrentImageIndex(0);
//   }, [match]);

//   // Handle image navigation
//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) =>
//       prev < match.images.length - 1 ? prev + 1 : prev
//     );
//   };

//   const handlePreviousImage = () => {
//     setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
//   };

//   // Drag gesture handler
//   const bind = useDrag(
//     ({ movement: [mx, my], velocity, direction: [dx], last, cancel }) => {
//       // Update card position during drag
//       api.start({ x: mx, y: my });

//       if (last) {
//         // Determine swipe based on movement and velocity
//         if (my < -200 && onSwipeUp) {
//           // Swipe up
//           api.start({
//             y: -500,
//             onRest: () => {
//               api.set({ x: 0, y: 0 });
//               onSwipeUp();
//             },
//           });
//           cancel();
//         } else if (mx > 200 || (mx > 100 && velocity > 0.5)) {
//           // Swipe right
//           api.start({
//             x: 500,
//             onRest: () => {
//               api.set({ x: 0, y: 0 });
//               onSwipeRight();
//             },
//           });
//           cancel();
//         } else if (mx < -200 || (mx < -100 && velocity > 0.5)) {
//           // Swipe left
//           api.start({
//             x: -500,
//             onRest: () => {
//               api.set({ x: 0, y: 0 });
//               onSwipeLeft();
//             },
//           });
//           cancel();
//         } else {
//           // Snap back
//           api.start({ x: 0, y: 0 });
//         }
//       }
//     },
//     {
//       bounds: cardRef,
//       rubberband: true,
//       filterTaps: true,
//     }
//   );

//   return (
//     <animated.div
//       ref={cardRef}
//       {...bind()}
//       className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg touch-none"
//       style={{
//         x,
//         y,
//         touchAction: "none",
//         opacity: x.to([-500, 0, 500], [0, 1, 0]),
//         transform: x.to((xVal) => `rotateZ(${xVal / 20}deg)`),
//       }}
//     >
//       {/* Image */}
//       <div className="w-full h-full relative">
//         <Image
//           src={match.images[currentImageIndex].url}
//           alt={`Photo of ${match.firstName}`}
//           fill
//           className="object-cover"
//           priority
//         />

//         {/* Image indicators */}
//         <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-10">
//           {match.images.map((_, index) => (
//             <div
//               key={index}
//               className={`h-1 rounded-full transition-all ${
//                 index === currentImageIndex
//                   ? "w-8 bg-[#DD101E]"
//                   : "w-2 bg-white bg-opacity-60"
//               }`}
//             />
//           ))}
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#181A20] to-transparent" />
//         <div className="absolute bottom-24 left-4 right-4 text-white">
//           <h2 className="text-5xl font-bold">
//             {match.firstName} {match.lastName}
//           </h2>
//           <div className="flex mt-2 gap-4">
//             <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
//               {match.sex}
//             </span>
//             <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
//               {match.relationship_goal}
//             </span>
//             <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
//               {match.distance} miles
//             </span>
//           </div>
//         </div>
//       </div>
//     </animated.div>
//   );
// };
import React from 'react'

export default function MatchCard() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}
