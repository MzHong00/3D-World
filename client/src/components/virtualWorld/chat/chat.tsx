import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import styles from "./chat.module.css";
import { useUserStore } from "stores/useUserStore";
import { useChatStore } from "stores/useChatStore";

export const Chat = () => {
  const [inputChat, setInputChat] = useState<string>("");
  const chatDisplayRef = useRef<HTMLUListElement>(null);
  
  const { socket, chat, userCount } = useChatStore();
  const { userId } = useUserStore();

  useEffect(() => {
    chatDisplayRef.current?.scrollTo(0, chatDisplayRef.current.scrollHeight)
  }, [chat]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.target.value);
  };

  const onClickSendButton = () => {
    if (!inputChat) return; // 빈 문자열일 경우 전송하지 않음

    const data = {
      userId: userId,
      time: `${new Date().toLocaleTimeString()}`,
      chat: inputChat,
    };
    socket?.send(JSON.stringify(data));

    setInputChat("");
  };

  const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSendButton();
    }
  };

  return (
    <div className={styles.chatContainer} onClick={(e) => e.stopPropagation()}>
      <section>
        <div>
          <div>
            <FaUser size={14} />
            <span>{userCount}</span>
          </div>
          <span>익명-{userId}</span>
        </div>
      </section>
      <section className={styles.chatDisplay} ref={chatDisplayRef}>
        {chat.map((data, idx) => (
          <li key={idx} className={styles.chatBalloon}>
            <div>
              <span className={styles.chatTextName}>익명-{data.userId}</span>
              <span className={styles.chatTextTime}>{`${data.time}`}</span>
            </div>
            <span>{data.chat}</span>
          </li>
        ))}
      </section>
      <section className={styles.chatSend}>
        <input
          value={inputChat}
          className={styles.chatSendInput}
          placeholder="채팅"
          onChange={onChangeInput}
          onKeyDown={onKeyDownInput}
        />
        <IoMdSend
          className={styles.chatSendButton}
          onClick={onClickSendButton}
        />
      </section>
    </div>
  );
};
