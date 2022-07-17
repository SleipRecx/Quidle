import { Stats, TriviaQuestion } from "src/models/client/questions";

export type QuizTemplateProps = {
  questions: TriviaQuestion[];
  onPressAnswer: (question: TriviaQuestion, answer: string) => void;
  questionIndex: number;
  highlightCorrectAnswer: boolean;
  onTimeComplete: () => void;
  isFinished: boolean;
  stats: Stats;
  points: number;
};
