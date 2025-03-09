import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for our matches
export interface Image {
  id: string;
  url: string;
}

export interface Match {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: number;
  profileImg: string;
  interests: string[];
  images: Image[];
  liked?: boolean;
  disliked?: boolean;
  hot?: boolean;
}

interface MatchStore {
  matches: Match[];
  likedMatches: Match[];
  currentIndex: number;
  isLoading: boolean;
  isError: boolean;
  // Actions
  setMatches: (matches: Match[]) => void;
  likeMatch: (id: string) => void;
  dislikeMatch: (id: string) => void;
  markAsHot: (id: string) => void;
  resetReaction: (id: string) => void;
  setCurrentIndex: (index: number) => void;
  refreshMatches: () => void;
}

// Demo data
const demoMatches: Match[] = [
  {
    id: '1',
    name: 'Emma',
    age: 28,
    bio: 'Passionate photographer and travel enthusiast. Always planning my next adventure.',
    distance: 3,
    profileImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    interests: ['Photography', 'Travel', 'Hiking'],
    images: [
      { id: '1a', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { id: '1b', url: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f' },
      { id: '1c', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' }
    ]
  },
  {
    id: '2',
    name: 'Sophia',
    age: 26,
    bio: 'Yoga instructor and bookworm. Looking for someone to share deep conversations with.',
    distance: 5,
    profileImg: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    interests: ['Yoga', 'Reading', 'Coffee'],
    images: [
      { id: '2a', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' },
      { id: '2b', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04' },
      { id: '2c', url: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f' }
    ]
  },
  {
    id: '3',
    name: 'Olivia',
    age: 25,
    bio: 'Music lover and concert-goer. Can play guitar and piano.',
    distance: 2,
    profileImg: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8',
    interests: ['Music', 'Concerts', 'Instruments'],
    images: [
      { id: '3a', url: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8' },
      { id: '3b', url: 'https://images.unsplash.com/photo-1617077644557-64be144aa306' },
      { id: '3c', url: 'https://images.unsplash.com/photo-1622023459113-9b195477d9c4' }
    ]
  },
  {
    id: '4',
    name: 'Ava',
    age: 27,
    bio: 'Chef by profession, foodie by heart. Love trying new recipes and restaurants.',
    distance: 6,
    profileImg: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    interests: ['Cooking', 'Food', 'Restaurants'],
    images: [
      { id: '4a', url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df' },
      { id: '4b', url: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c' },
      { id: '4c', url: 'https://images.unsplash.com/photo-1496440737103-cd596325d314' }
    ]
  },
  {
    id: '5',
    name: 'Isabella',
    age: 24,
    bio: 'Artist and dog lover. Looking for someone to join my gallery visits.',
    distance: 4,
    profileImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
    interests: ['Art', 'Dogs', 'Painting'],
    images: [
      { id: '5a', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1' },
      { id: '5b', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
      { id: '5c', url: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b' }
    ]
  }
];

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matches: demoMatches,
      likedMatches: [],
      currentIndex: 0,
      isLoading: false,
      isError: false,
      
      setMatches: (matches) => set({ matches }),
      
      likeMatch: (id) => {
        const { matches, likedMatches } = get();
        const match = matches.find(m => m.id === id);
        
        if (match) {
          // Update match status
          const updatedMatches = matches.map(m => 
            m.id === id ? { ...m, liked: true, disliked: false, hot: false } : m
          );
          
          // Add to liked matches if not already there
          const isAlreadyLiked = likedMatches.some(m => m.id === id);
          const updatedLikedMatches = isAlreadyLiked 
            ? likedMatches 
            : [...likedMatches, { ...match, liked: true }];
          
          set({ 
            matches: updatedMatches,
            likedMatches: updatedLikedMatches
          });
        }
      },
      
      dislikeMatch: (id) => {
        const { matches, likedMatches } = get();
        
        // Update match status
        const updatedMatches = matches.map(m => 
          m.id === id ? { ...m, disliked: true, liked: false, hot: false } : m
        );
        
        // Remove from liked matches if present
        const updatedLikedMatches = likedMatches.filter(m => m.id !== id);
        
        set({ 
          matches: updatedMatches,
          likedMatches: updatedLikedMatches
        });
      },
      
      markAsHot: (id) => {
        const { matches } = get();
        
        // Update match status
        const updatedMatches = matches.map(m => 
          m.id === id ? { ...m, hot: true, liked: false, disliked: false } : m
        );
        
        set({ matches: updatedMatches });
      },
      
      resetReaction: (id) => {
        const { matches } = get();
        
        // Reset all reactions for this match
        const updatedMatches = matches.map(m => 
          m.id === id ? { ...m, liked: false, disliked: false, hot: false } : m
        );
        
        set({ matches: updatedMatches });
      },
      
      setCurrentIndex: (index) => set({ currentIndex: index }),
      
      refreshMatches: () => {
        // In a real app, we'd fetch new matches here
        // For demo, we'll just reset the current index
        set({ currentIndex: 0 });
      }
    }),
    {
      name: 'match-storage', // unique name for localStorage
      partialize: (state) => ({ likedMatches: state.likedMatches }), // only store liked matches
    }
  )
);