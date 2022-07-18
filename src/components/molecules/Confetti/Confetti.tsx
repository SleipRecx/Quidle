import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: Math.random() * (originXB - originXA) + originXA,
      y: Math.random() - 0.2,
    },
    colors: ["#9F66FF", "#00ff00", "#ff0033", "#FFD700", "orange"],
  };
}

const CONFETTI_TIME_MILLI_SECONDS = 600;

const Confetti = () => {
  // Set to true if you want to start, pause and stop fireworks with buttons
  const showControlButtons = false;

  const refAnimationInstance = useRef(null) as any;
  const [intervalId, setIntervalId] = useState(null as any);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    startAnimation();
    setTimeout(() => {
      pauseAnimation();
    }, CONFETTI_TIME_MILLI_SECONDS);
    1200;
  }, []);

  return (
    <>
      {showControlButtons && (
        <div>
          <button onClick={startAnimation}>Start</button>
          <button onClick={pauseAnimation}>Pause</button>
          <button onClick={stopAnimation}>Stop</button>
        </div>
      )}
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
};
export default Confetti;
