import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import "../../../style.scss";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <AiFillCamera size={25} className="react-icon" />
          <AiOutlineUserAdd size={25} className="react-icon" />
          <FiMoreHorizontal size={25} className="react-icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
