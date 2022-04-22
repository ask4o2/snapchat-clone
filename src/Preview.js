import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCameraImage } from "./features/cameraSlice";
import { resetCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import {
  AttachFile,
  Close,
  Crop,
  MusicNote,
  Note,
  Send,
  Timer,
  TextFields,
} from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import { storage, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const sendPost = () => {
    const id = uuid();
    // upload image to firebase storage
    const storageRef = ref(storage, `posts/${id}`);
    // console.log(typeof cameraImage);
    uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          addDoc(collection(db, "posts"), {
            imageUrl: url,
            username: user.displayName,
            read: false,
            profilePic: user.profilePic,
            timestamp: new serverTimestamp(),
          });
          navigate("/chats");
        })
        .catch((err) => console.log(err));
      console.log("string uploaded");
    });

    // monitor upload uploadTask
    // and send download url to firestore
    // uploadTask.on(
    //   "state_changed",
    //   null,
    //   (error) => {
    //     // error function
    //     console.log(error);
    //   },
    //   () => {
    //     // complete function
    //     getDownloadURL(storage.ref(`posts/${id}`)).then((url) => {
    //       addDoc(collection(db, "posts"), {
    //         imageUrl: url,
    //         username: "o2official",
    //         read: false,
    //         // profilePic:,
    //         timestamp: new serverTimestamp(),
    //       });
    //       navigate("/chats");
    //     });
    //   }
    // );
  };

  return (
    <div className="preview">
      <Close
        fontSize="small"
        className="preview__close"
        onClick={closePreview}
      />
      {/* <h1>This is your preview</h1> */}
      <div className="preview__toolbarRight">
        <TextFields />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />
      {/* send now button */}
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send now</h2>
        <Send className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
