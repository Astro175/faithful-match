// "use client";
// import React from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { motion } from "framer-motion";

// interface Match {
//   id: string;
//   name: string;
//   age: number;
//   bloodGroup: string;
//   religion: string;
//   distance: number;
//   imageUrl: string;
// }

// // Sample data for likes
// const likesData: Match[] = [
//   {
//     id: "1",
//     name: "Sarah",
//     age: 28,
//     bloodGroup: "A+",
//     religion: "Christian",
//     distance: 5,
//     imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//   },
//   {
//     id: "2",
//     name: "Michael",
//     age: 32,
//     bloodGroup: "O-",
//     religion: "Muslim",
//     distance: 7,
//     imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
//   },
//   {
//     id: "3",
//     name: "Jessica",
//     age: 26,
//     bloodGroup: "B+",
//     religion: "Christian",
//     distance: 3,
//     imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
//   },
//   {
//     id: "4",
//     name: "Ahmed",
//     age: 30,
//     bloodGroup: "AB+",
//     religion: "Muslim",
//     distance: 8,
//     imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
//   },
// ];

// // Sample data for super likes
// const superLikesData: Match[] = [
//   {
//     id: "5",
//     name: "Emma",
//     age: 27,
//     bloodGroup: "A-",
//     religion: "Christian",
//     distance: 4,
//     imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
//   },
//   {
//     id: "6",
//     name: "Jamal",
//     age: 33,
//     bloodGroup: "O+",
//     religion: "Muslim",
//     distance: 6,
//     imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
//   },
//   {
//     id: "7",
//     name: "Sophia",
//     age: 25,
//     bloodGroup: "B-",
//     religion: "Christian",
//     distance: 2,
//     imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
//   },
//   {
//     id: "8",
//     name: "Omar",
//     age: 31,
//     bloodGroup: "AB-",
//     religion: "Muslim",
//     distance: 9,
//     imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
//   },
// ];

// // Card animation variants
// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   }),
// };

// // MatchCard component
// const MatchCard: React.FC<{ match: Match; index: number }> = ({
//   match,
//   index,
// }) => {
//   return (
//     <motion.div
//       custom={index}
//       initial="hidden"
//       animate="visible"
//       variants={cardVariants}
//       whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
//       className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
//     >
//       <div className="relative h-64 w-full">
//         <img
//           src={match.imageUrl}
//           alt={match.name}
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
//           <h3 className="text-white text-xl font-semibold">
//             {match.name}, {match.age}
//           </h3>
//           <div className="flex gap-2 mt-2">
//             <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
//               {match.bloodGroup}
//             </span>
//             <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
//               {match.religion}
//             </span>
//             <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
//               {match.distance} km
//             </span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // MatchesGrid component to display cards in a grid
// const MatchesGrid: React.FC<{ matches: Match[] }> = ({ matches }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
//       {matches.map((match, index) => (
//         <MatchCard key={match.id} match={match} index={index} />
//       ))}
//     </div>
//   );
// };

// // Main MatchesPage component
// const MatchesPage: React.FC = () => {
//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-2xl font-bold mb-6">Your Matches</h1>

//       <Tabs defaultValue="likes" className="w-full">
//         <TabsList className="mb-6 w-full">
//           <TabsTrigger
//             value="likes"
//             className="flex-1 data-[state=active]:bg-[#DD101E] data-[state=active]:text-white"
//           >
//             Likes ({likesData.length})
//           </TabsTrigger>
//           <TabsTrigger
//             value="superlikes"
//             className="flex-1 data-[state=active]:bg-[#DD101E] data-[state=active]:text-white"
//           >
//             Super Likes ({superLikesData.length})
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent
//           value="likes"
//           className="focus-visible:outline-none focus-visible:ring-0"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <MatchesGrid matches={likesData} />
//           </motion.div>
//         </TabsContent>

//         <TabsContent
//           value="superlikes"
//           className="focus-visible:outline-none focus-visible:ring-0"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <MatchesGrid matches={superLikesData} />
//           </motion.div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default MatchesPage;
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
