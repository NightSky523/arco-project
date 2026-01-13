import { getProfile } from "@/apis/profile";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Token = string | null | undefined;

interface User {
  id: number;
  username: string;
  email?: string;
}

interface GlobalState {
  me?: User;
  token: Token;
  loadingMe: boolean;
  setMe: (me: User | undefined) => void;
  setToken: (token: Token) => void;
  fetchMe: () => Promise<void>;
  logout: () => void;
}

const storage = typeof window != "undefined" ? window.localStorage : undefined;

export const useGlobal = create<GlobalState, [["zustand/immer", never]]>(
  immer((set) => ({
    loadingMe: true,
    token: storage?.getItem("token"),

    setToken: (token: Token) => {
      set((state) => {
        storage?.setItem("token", token || "");
        state.token = token;
      });
    },

    setMe: (me: User | undefined) => {
      set((state) => {
        state.me = me;
      });
    },

    fetchMe: async () => {
      const token = storage?.getItem("token");

      if (!token) {
        set((state) => {
          state.me = undefined;
          state.loadingMe = false;
        });
        return;
      }

      try {
        const res = await getProfile();

        if (!res) {
          throw new Error("Failed to fetch user");
        }

        set((state) => {
          state.me = res.data;
          state.loadingMe = false;
        });
      } catch (e) {
        set((state) => {
          state.me = undefined;
          state.loadingMe = false;
        });
        storage?.removeItem("token");
        console.error(e);
      }
    },

    logout: () => {
      storage?.removeItem("token");
      set((state) => {
        state.me = undefined;
      });
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  }))
);
