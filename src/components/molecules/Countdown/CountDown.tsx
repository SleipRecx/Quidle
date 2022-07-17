import React from "react";
import ReactCountdown from "react-countdown";
import { CountdownProps } from "./types";

const CountDown = ({ onComplete }: CountdownProps) => {
  return (
    <ReactCountdown
      date={Date.now() + 60000}
      onComplete={onComplete}
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
