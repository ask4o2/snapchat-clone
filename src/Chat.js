import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import "./Chat.css";
import { useDispatch } from "react-redux";
import ReactTimeAgo from "react-timeago";
import { useNavigate } from "react-router-dom";
import { selectImage } from "./features/appSlice";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      setDoc(
        doc(db, "posts", id),
        {
          read: true,
        },
        { merge: true }
      );

      navigate("/chats/view");
    }
  };

  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />
          {/* <Timeago date={new Date(timestamp?.toDate())} /> */}
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
