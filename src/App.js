import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            displayName: authUser.displayName,
            profilePic: authUser.photoURL,
            email: authUser.email,
            id: authUser.uid,
          })
        );
        // console.log(authUser);
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {/* Router start here */}
      <Router>
        {!user ? (
          <>
            <Login />
          </>
        ) : (
          <>
            <img
              className="app__logo"
              src="https://seeklogo.com/images/S/snapchat-logo-178D29F75B-seeklogo.com.png"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Routes>
                  <Route exact path="/preview" element={<Preview />} />
                  <Route exact path="/" element={<WebcamCapture />} />
                  <Route exact path="/chats" element={<Chats />} />
                  <Route exact path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
      {/* Router ends here */}
      {/* redirect */}
      {/* install react-router-dom */}
    </div>
  );
}

export default App;
