import { ChatBubble, Search, RadioButtonUnchecked } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { selectUser } from "./features/appSlice";
import { resetCameraImage } from "./features/cameraSlice";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState(null);
  const user = selectUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const postsref = collection(db, "posts");
    const q = query(postsref, orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => signOut(auth)}
          className="chats__avatar"
        />
        <div className="chats__search">
          <Search style={{ fontSize: "14px", color: "whitesmoke" }} />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubble style={{ color: "white", fontSize: "18px" }} />
      </div>

      <div className="chat__posts">
        {posts?.map(
          ({
            id,
            data: { username, read, timestamp, imageUrl, profilePic },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonUnchecked
        className="chats__takeSnap"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
