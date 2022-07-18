import React from "react";
import ReactCountdown from "react-countdown";
import { GAME_TIME_MS } from "src/constants/app";
import { CountdownProps } from "./types";

const CountDown = ({ onComplete }: CountdownProps) => {
  return (
    <ReactCountdown
      date={Date.now() + GAME_TIME_MS}
      onComplete={onComplete}
      onTick={(delta) => console.log("delta", delta.seconds)}
      renderer={(props) => (
        <div
          style={{
            fontSize: 45,
          }}
        >
          {`${props.seconds + props.minutes * 60}s`}
        </div>
      )}
    />
  );
};

export default React.memo(CountDown);
