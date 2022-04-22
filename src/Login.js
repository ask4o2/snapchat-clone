import React from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { auth, provider } from "./firebase";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const user = {
          displayName: res.user.displayName,
          profilePic: res.user.photoURL,
          email: res.user.email,
          id: res.user.uid,
        };
        dispatch(login(user));
        // console.log(user);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://seeklogo.com/images/S/snapchat-logo-178D29F75B-seeklogo.com.png"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;
