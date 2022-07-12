import {
  AddOutlined,
  CardGiftcard,
  EmojiEmotions,
  Gif,
} from "@mui/icons-material";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { selectChannel } from "../features/appSlice";
import { logout, selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import ChatHeader from "./ChatHeader";
import Message from "./Message";

function Chat() {
  const channel = useSelector(selectChannel);
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (channel?.channelId) {
      const q = query(
        collection(db, "channels/" + channel?.channelId + "/messages"),
        orderBy("timeStamp", "asc")
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const listMessages = snapshot.docs?.map((doc) => {
          return doc.data();
        });
        setMessages(listMessages);
      });
      setTimeout(()=>{scrollToChatBottom()}, 10)
    }
  }, [channel.channelId]);

  const scrollToChatBottom = () => {
    var objDiv = document.querySelector(".chat__messages");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(user);
    addDoc(collection(db, "channels/" + channel?.channelId + "/messages/"), {
      messageContent: input,
      timeStamp: serverTimestamp(),
      user,
    });
    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat__messages">
        {messages?.map((item, index) => (
          <Message
            key={index}
            name={item?.user?.displayName}
            content={item?.messageContent}
            timeStamp={item?.timeStamp?.toDate().toUTCString()}
            avatarURL={item?.user?.photoURL}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddOutlined className="grey white_hover" />
        <form>
          <input
            disabled={!channel.channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type={"text"}
            placeholder={"Messeage #CHAT"}
          />
          <button
            disabled={!channel.channelId}
            onClick={sendMessage}
            className="chat__inputButton"
            type={"submit"}
          >
            Send
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcard className="grey white_hover" />
          <Gif className="grey white_hover" />
          <EmojiEmotions className="grey white_hover" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
