export type CountDownProps = {
  onComplete?: () => void;
  progressBar?: boolean;
};

export type CountDownBarProps = {
  remainingTimeMs: number;
};

export type CountDownTextProps = {
  onComplete?: () => void;
  setRemainingTimeMs: (remainingTimeMs: number) => void;
};
