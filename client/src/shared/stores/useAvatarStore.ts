import { create } from "zustand";

import DefaultAvatar from "shared/asset/3d/person.glb";

interface AvatarState {
  avatar: string | undefined;
  setAvatar: (avatarUrl: string) => void;
}

export const useAvatarStore = create<AvatarState>()((set) => ({
  avatar: DefaultAvatar,
  setAvatar: (avatarUrl) => set(() => ({ avatar: avatarUrl })),
}));
