import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Row, Col } from "react-bootstrap";
import Login from "./screens/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "./components/Loading";
import { selectIsLoading, setIsLoading } from "./features/appSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    document.title = 'My Playground';
  },[]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      dispatch(setIsLoading(true))
      if (authUser) {
        dispatch(
          login({
            uid: authUser?.uid || "",
            displayName: authUser?.displayName || "",
            email: authUser?.email || "",
            emailVerified: authUser?.emailVerified || "",
            isAnonymous: authUser?.isAnonymous || "",
            photoURL: authUser?.photoURL || "",
            providerData: authUser?.providerData || "",
            createdAt: authUser?.createdAt || "",
            lastLoginAt: authUser?.lastLoginAt || "",
            apiKey: authUser?.apiKey || "",
          })
        );
      } else {
        dispatch(logout());
      }
      dispatch(setIsLoading(false))
    });
  }, [dispatch]);

  const renderLoading = () => {
    return <Loading />;
  };

  const renderMainApp = () => {
    if (user) {
      return (
        <>
          <Sidebar></Sidebar>
          <Chat></Chat>
        </>
      );
    } else {
      return <Login />;
    }
  };

  return (
    <div className="app">
      {renderMainApp()}
      {isLoading && renderLoading()}
    </div>
  );
}

export default App;
