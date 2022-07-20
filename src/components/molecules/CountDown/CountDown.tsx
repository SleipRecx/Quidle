import React, { useState } from "react";
import { GAME_TIME_MS } from "src/constants/app";
import CountDownBar from "./CountDownBar";
import CountDownText from "./CountDownText";
import { CountDownProps } from "./types";

const CountDown = ({ onComplete, progressBar }: CountDownProps) => {
  const [remainingTimeMs, setRemainingTimeMs] = useState(GAME_TIME_MS);
  return (
    <div>
      <div
        style={{
          display: progressBar && remainingTimeMs > 1000 ? "block" : "none",
          width: "100%",
        }}
      >
        <CountDownBar remainingTimeMs={remainingTimeMs} />
      </div>

      <div
        style={{
          display: progressBar ? "none" : "block",
        }}
      >
        <CountDownText
          setRemainingTimeMs={setRemainingTimeMs}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default React.memo(CountDown);
