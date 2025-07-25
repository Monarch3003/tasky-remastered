import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
  lastUpdated: string;
  email: string;
  token: string;
};

type UserStoreProps = {
  user: UserProps | null;
  hasHydrated: boolean;
  setUser: (user: UserProps) => void;
  logOut: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useUser = create<UserStoreProps>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      logOut: () => set({ user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "tasky-user",
      onRehydrateStorage: () => (state) => {
        // Mark hydration complete
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useUser;
