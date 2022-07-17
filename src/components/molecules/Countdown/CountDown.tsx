import React from "react";
import ReactCountdown from "react-countdown";
import { CountdownProps } from "./types";

const CountDown = ({ onComplete }: CountdownProps) => {
  return <ReactCountdown date={Date.now() + 60000} onComplete={onComplete} />;
};

export default React.memo(CountDown);
