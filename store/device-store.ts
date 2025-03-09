import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DeviceState {
  isMobile: boolean;
  setMobile: (isMobile: boolean) => void;
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      isMobile: false, 
      setMobile: (isMobile: boolean) => set({ isMobile }),
    }),
    {
      name: 'device-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);