import { create } from "zustand";
import { ChatDto } from "shared/types/type";

interface ChatState {
  socket: WebSocket | undefined;
  userCount: number;
  chat: ChatDto[];
  setSocket: (socket: WebSocket) => void;
  setChat: (chatData: ChatDto) => void;
  setUserCount: (userCount: number) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
  chat: [],
  socket: undefined,
  userCount: 0,
  setChat: (chatData) => set((prev) => ({ chat: [...prev.chat, chatData] })),
  setSocket: (socket) => set(() => ({ socket: socket })),
  setUserCount: (userCount: number) => set(() => ({ userCount: userCount })),
}));
