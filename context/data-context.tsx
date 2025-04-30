// context/data-context.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";

export interface Profile {
  id: string;
  name: string;
  age: number;
  about: string;
  genotype: string;
  religion: "Christian" | "Muslim";
  distance: number;
  images: string[];
  liked: boolean; // The profile has liked YOU
  likedByYou: boolean; // YOU have liked the profile
  lastOnline: Date;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isMedia?: boolean;
  mediaUrl?: string;
  isVoice?: boolean;
}

export interface Chat {
  matchId: string;
  messages: Message[];
  isTyping: boolean;
}

export interface Notification {
  id: string;
  type: "new_match" | "new_like" | "message";
  message: string;
  timestamp: Date;
  read: boolean;
}

type AppState = {
  profiles: Profile[];
  matches: Profile[];
  likes: Profile[];
  chats: Chat[];
  notifications: Notification[];
};

type Action =
  | { type: "LIKE_PROFILE"; profileId: string }
  | { type: "DECLINE_PROFILE"; profileId: string }
  | { type: "SEND_MESSAGE"; chatId: string; message: string }
  | { type: "MARK_NOTIFICATION_READ"; notificationId: string };

const DataContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
} | null>(null);

// Generate 10 mock profiles with some existing matches
const generateMockProfiles = (): Profile[] => [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 28,
    about: "Adventure seeker and coffee lover",
    genotype: "AA",
    religion: "Christian",
    distance: 2.5,
    images: [
      "https://picsum.photos/id/1015/400/600",
      "https://picsum.photos/id/1016/400/600",
    ],
    liked: true,
    likedByYou: true,
    lastOnline: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 31,
    about: "Professional chef and hiking enthusiast",
    genotype: "AS",
    religion: "Muslim",
    distance: 1.8,
    images: [
      "https://picsum.photos/id/1025/400/600",
      "https://picsum.photos/id/1027/400/600",
    ],
    liked: true,
    likedByYou: true,
    lastOnline: new Date(),
  },
  {
    id: "3",
    name: "Emma Wilson",
    age: 24,
    about: "Artist and nature lover",
    genotype: "AA",
    religion: "Christian",
    distance: 4.2,
    images: ["https://picsum.photos/id/103/400/600"],
    liked: false,
    likedByYou: true,
    lastOnline: new Date(Date.now() - 7200000),
  },
  {
    id: "4",
    name: "David Brown",
    age: 35,
    about: "Tech entrepreneur and traveler",
    genotype: "AS",
    religion: "Christian",
    distance: 0.5,
    images: [
      "https://picsum.photos/id/104/400/600",
      "https://picsum.photos/id/105/400/600",
    ],
    liked: true,
    likedByYou: false,
    lastOnline: new Date(Date.now() - 1800000),
  },
  {
    id: "5",
    name: "Olivia Davis",
    age: 27,
    about: "Yoga instructor and vegan foodie",
    genotype: "AA",
    religion: "Muslim",
    distance: 3.1,
    images: [
      "https://picsum.photos/id/106/400/600",
      "https://picsum.photos/id/107/400/600",
    ],
    liked: true,
    likedByYou: true,
    lastOnline: new Date(),
  },
  {
    id: "6",
    name: "James Miller",
    age: 29,
    about: "Musician and songwriter",
    genotype: "AS",
    religion: "Christian",
    distance: 5.8,
    images: ["https://picsum.photos/id/108/400/600"],
    liked: false,
    likedByYou: false,
    lastOnline: new Date(Date.now() - 86400000),
  },
  {
    id: "7",
    name: "Sophia Wilson",
    age: 26,
    about: "Medical student and book lover",
    genotype: "AA",
    religion: "Muslim",
    distance: 2.3,
    images: [
      "https://picsum.photos/id/109/400/600",
      "https://picsum.photos/id/110/400/600",
    ],
    liked: false,
    likedByYou: true,
    lastOnline: new Date(),
  },
  {
    id: "8",
    name: "Daniel Moore",
    age: 33,
    about: "Architect and photography enthusiast",
    genotype: "AS",
    religion: "Christian",
    distance: 6.5,
    images: ["https://picsum.photos/id/111/400/600"],
    liked: false,
    likedByYou: false,
    lastOnline: new Date(Date.now() - 3600000),
  },
  {
    id: "9",
    name: "Mia Taylor",
    age: 30,
    about: "Digital nomad and language learner",
    genotype: "AA",
    religion: "Muslim",
    distance: 1.2,
    images: [
      "https://picsum.photos/id/112/400/600",
      "https://picsum.photos/id/113/400/600",
    ],
    liked: true,
    likedByYou: false,
    lastOnline: new Date(),
  },
  {
    id: "10",
    name: "Ethan Anderson",
    age: 32,
    about: "Engineer and board game collector",
    genotype: "AS",
    religion: "Christian",
    distance: 4.7,
    images: ["https://picsum.photos/id/114/400/600"],
    liked: true,
    likedByYou: true,
    lastOnline: new Date(Date.now() - 7200000),
  },
];

const initialState: AppState = {
  profiles: generateMockProfiles(),
  matches: generateMockProfiles().filter((p) => p.liked && p.likedByYou),
  likes: generateMockProfiles().filter((p) => p.liked),
  chats: [
    {
      matchId: "1",
      messages: [
        {
          id: "1",
          senderId: "1",
          text: "Hey there! 😊",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          senderId: "current-user",
          text: "Hi Sarah! How are you?",
          timestamp: new Date(Date.now() - 3500000),
        },
      ],
      isTyping: false,
    },
    {
      matchId: "5",
      messages: [
        {
          id: "1",
          senderId: "5",
          text: "Hello! 🌱",
          timestamp: new Date(Date.now() - 7200000),
        },
      ],
      isTyping: false,
    },
  ],
  notifications: [
    {
      id: "1",
      type: "new_match",
      message: "You matched with Sarah Johnson!",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: "2",
      type: "new_match",
      message: "You matched with Olivia Davis!",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: "3",
      type: "new_like",
      message: "Michael Chen liked your profile!",
      timestamp: new Date(Date.now() - 10800000),
      read: false,
    },
  ],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LIKE_PROFILE": {
      const profile = state.profiles.find((p) => p.id === action.profileId);
      if (!profile) return state;

      const isMatch = profile.liked;
      const updatedProfiles = state.profiles.map((p) =>
        p.id === action.profileId ? { ...p, likedByYou: true } : p
      );

      return {
        ...state,
        profiles: updatedProfiles,
        matches: isMatch ? [...state.matches, profile] : state.matches,
        notifications: isMatch
          ? [
              ...state.notifications,
              {
                id: Date.now().toString(),
                type: "new_match",
                message: `You matched with ${profile.name}!`,
                timestamp: new Date(),
                read: false,
              },
            ]
          : state.notifications,
      };
    }
    case "DECLINE_PROFILE": {
      return {
        ...state,
        profiles: state.profiles.filter((p) => p.id !== action.profileId),
      };
    }
    case "SEND_MESSAGE": {
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat.matchId === action.chatId) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: Date.now().toString(),
                  senderId: "current-user",
                  text: action.message,
                  timestamp: new Date(),
                },
              ],
            };
          }
          return chat;
        }),
      };
    }
    case "MARK_NOTIFICATION_READ": {
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.notificationId
            ? { ...notification, read: true }
            : notification
        ),
      };
    }
    default:
      return state;
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
export { DataContext };
