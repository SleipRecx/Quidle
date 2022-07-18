import { Stats, TriviaQuestion } from "src/models/client/questions/types";

export type PracticeQuizTemplateProps = {
  question?: TriviaQuestion;
  onPressAnswer: (question: TriviaQuestion, answer: string) => void;
};
