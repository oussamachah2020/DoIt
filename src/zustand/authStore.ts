import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface IAuthStore {
  session: Session | null;
  setSession: (value: Session | null) => void;
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (value: Session | null) => {
        set(() => ({ session: value }));
      },

      isAuth: false,
      setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
    }),
    {
      name: "session",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
