import { Stats, TriviaQuestion } from "src/models/client/questions/types";

export type QuizTemplateProps = {
  question?: TriviaQuestion;
  onPressAnswer: (question: TriviaQuestion, answer: string) => void;
  onTimeComplete: () => void;
  isStarted: boolean;
  isFinished: boolean;
  stats: Stats;
  onPressPlay: () => void;
  onPressPracticeMath: () => void;
  onPressPracticeTrivia: () => void;
  loading: boolean;
};
