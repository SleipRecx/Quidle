import React from "react";
import { GAME_TIME_MS } from "src/constants/app";
import { CountDownBarProps } from "./types";

const CountDownBar = ({ remainingTimeMs }: CountDownBarProps) => {
  return (
    <div
      style={{
        backgroundColor: "#3a3a3c",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "white",
          height: 5,
          transition: "width 1s ease",
          width: `${(100 * remainingTimeMs) / GAME_TIME_MS}%`,
        }}
      ></div>
    </div>
  );
};

export default CountDownBar;
