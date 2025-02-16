import { UserStoreT } from "@/types/storeTypes";
import { UserProfile } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// create a store to manage user
const useUserStore = create<UserStoreT>()(
  persist(
    (set) => ({
      user: null,
      setUser: (profile) => set({ user: profile }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // store in local storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// external function to set user data in the store
export const setUserForStore = (userData: UserProfile) => {
  useUserStore.getState().setUser(userData);
};

export default useUserStore;
