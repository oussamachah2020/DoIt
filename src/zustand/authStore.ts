import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface IAuthStore {
  session: Session | null;
  setSession: (value: Session) => void;
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  token: string | null;
  setToken: (value: string) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  session: null,
  setSession: (value: Session) => {
    set(() => ({ session: value }));
  },

  isAuth: false,
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),

  token: null,
  setToken: (value: string) => set(() => ({ token: value })),
}));
