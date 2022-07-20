import React from "react";
import ReactCountdown from "react-countdown";
import { GAME_TIME_MS } from "src/constants/app";
import { CountDownTextProps } from "./types";

const CountDownText = ({
  onComplete,
  setRemainingTimeMs,
}: CountDownTextProps) => {
  return (
    <div>
      <ReactCountdown
        date={Date.now() + GAME_TIME_MS}
        onComplete={onComplete}
        onTick={(delta) => setRemainingTimeMs(delta.total)}
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
    </div>
  );
};

export default React.memo(CountDownText);
