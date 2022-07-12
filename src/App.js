import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Row, Col } from "react-bootstrap";
import Login from "./screens/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser?.uid || '',
          displayName: authUser?.displayName || '',
          email: authUser?.email || '',
          emailVerified: authUser?.emailVerified || '',
          isAnonymous: authUser?.isAnonymous || '',
          photoURL: authUser?.photoURL || '',
          providerData: authUser?.providerData || '',
          createdAt: authUser?.createdAt || '',
          lastLoginAt: authUser?.lastLoginAt || '',
          apiKey: authUser?.apiKey || '',
        }));
      } else {
        dispatch(logout())
      }
    });
  },[dispatch])

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar></Sidebar>
          <Chat></Chat>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
