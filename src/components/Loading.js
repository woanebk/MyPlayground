import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotties/rocket.json";

function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="loading">
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default Loading;
