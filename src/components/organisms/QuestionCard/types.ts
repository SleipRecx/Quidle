import { TriviaQuestion } from "src/models/client/questions";

export type QuestionCardProps = {
  question: TriviaQuestion;
  onPressAnswer: (question: TriviaQuestion, answer: string) => void;
};
