import { useEffect } from "react";
import { ChatDto } from "shared/types/type";
import { useChatStore } from "stores/useChatStore";

export const useWebSocket = () => {
  const { setChat, setUserCount, setSocket } = useChatStore();

  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_SERVER_URL}`);
    setSocket(socket);

    socket.onopen = () => {
      console.log("웹소켓 연결 성공");
    };
    socket.onmessage = async (e) => {
      if (typeof JSON.parse(e.data) === 'number') {
        setUserCount(e.data)
      } else {
        const chatData: ChatDto = JSON.parse(e.data);
        setChat(chatData);
      }
    };

    return () => {
      socket.close();
      console.log("웹소켓 연결 해제");
    };
  }, [setChat, setSocket, setUserCount]);
};
