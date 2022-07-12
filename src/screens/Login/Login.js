import React from "react";
import "../../App.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {provider} from '../../firebase'
import { useDispatch, useSelector } from "react-redux";

function Login() {

  const user = useSelector((state) => state.user.user);

  const onLoginPress = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="login">
      {/* <video className='login__backgroundVideos' src={"../../assets/    videos/loginVideo.mp4"} autoplay muted loop id="myVideo">
      </video> */}
      <div className="login__contents">{user?.displayName}</div>
      <div className="login__buttons">
        <button
          onClick={onLoginPress}
          className="login__button login__button--google"
        />
      </div>
    </div>
  );
}

export default Login;
