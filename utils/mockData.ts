import { User, Notification } from "@/types";

export const generateMockUsers = (count: number): User[] => {
  const genotypes = ["AA", "AS", "SS", "AC"];
  const religions = ["christian", "muslim"] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    age: 20 + Math.floor(Math.random() * 15),
    bio: `Hi, I'm User ${i + 1}. I love hiking, reading, and traveling.`,
    images: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      (_, j) => `https://picsum.photos/400/600?random=${i * 10 + j}`
    ),
    distance: Math.floor(Math.random() * 20) + 1,
    lastSeen: new Date(Date.now() - Math.random() * 86400000 * 7),
    online: Math.random() > 0.7,
    genotype: genotypes[Math.floor(Math.random() * genotypes.length)],
    religion: religions[Math.floor(Math.random() * religions.length)],
    likedMe: Math.random() > 0.5,
  }));
};

export const generateMockNotifications = (count: number): Notification[] => {
  const types = ["like", "match", "message"] as const;

  return Array.from({ length: count }, (_, i) => ({
    id: `notification-${i + 1}`,
    userId: "current-user",
    type: types[Math.floor(Math.random() * types.length)],
    content: `Notification ${i + 1} content`,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 3),
    read: Math.random() > 0.7,
    relatedUserId: `user-${Math.floor(Math.random() * 10) + 1}`,
  }));
};
