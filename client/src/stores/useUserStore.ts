import { create } from "zustand";

interface UserState {
  userId: number;
}

export const useUserStore = create<UserState>()((set) => ({
  userId: Math.floor(Math.random() * 999) + 1
}));
