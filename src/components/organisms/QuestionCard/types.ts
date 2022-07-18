import { TriviaQuestion } from "src/models/client/questions/types";

export type QuestionCardProps = {
  question: TriviaQuestion;
  onPressAnswer: (question: TriviaQuestion, answer: string) => void;
};
