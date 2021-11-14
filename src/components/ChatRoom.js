import React, { useState, useEffect, useRef } from "react";
import db, { auth } from "../firebase";
import SendMsg from "./SendMsg";
import "../css/Chat.css";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const pageTransition = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -100,
  },
};

const ChatRoom = () => {
  <motion.div initial="out" animate="in" exit="out" variants={pageTransition}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
    reprehenderit consequatur quis natus dolorum perspiciatis, saepe ratione
    perferendis, a quos libero dolore similique soluta voluptates consequuntur,
    nam omnis. Voluptatum ad nam accusantium porro harum!
  </motion.div>;

  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <Container className="chatArea">
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid, displayName }) => (
          <div>
            <div
              key={id}
              className={`msg ${
                uid === auth.currentUser.uid ? "sent" : "received"
              }`}
            >
              <img src={photoURL} alt="" />
              <p>
                {text}{" "}
                <span style={{ fontSize: "12px", fontFamily: "consolas" }}>
                  {displayName}{" "}
                </span>
              </p>
              <p></p>
            </div>
          </div>
        ))}
      </div>
      <SendMsg scroll={scroll} />
      <div ref={scroll}></div>
    </Container>
  );
};

export default ChatRoom;