import React, { useEffect } from "react";
import "../../App.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {provider} from '../../firebase'
import { useDispatch, useSelector } from "react-redux";
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/login-dots-red.json'

function Login() {

  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
    document.getElementById('myVideo').play();
  },[])

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <img className="login__logo" src={require('../../assets/images/logo.webp')}/>
        <h2>Online communicate platform</h2>
        <p>Connect with anyone, anywhere, anytime so you would never play alone</p>
      </div>
      <div className="login__buttons">
        <h3>Join us Using</h3>
        <button
          onClick={onLoginPress}
          className="login__button login__button--google"
        />
      </div>
      <video className='login__backgroundVideos' src={require("../../assets/videos/loginVideo.mp4")} autoplay={true} muted loop id="myVideo">
      </video>
      <div className="logo">
        <h1>Playground</h1>
      </div>
      <div className="login__dots login__dot1">
        <Lottie
          options={defaultOptions}
          height={600}
          width={600}
        />
      </div>
      <div className="login__dots login__dot2">
        <Lottie
          options={defaultOptions}
          height={600}
          width={600 }
        />
      </div>
      <div className="login__dots login__dot3">
        <Lottie
          options={defaultOptions}
          height={350}
          width={350}
        />
      </div>
    </div>
  );
}

export default Login;
