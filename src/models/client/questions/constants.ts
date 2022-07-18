import { TriviaQuestion } from "./types";

export const DUMMY_QUESTION: TriviaQuestion = {
  allAnswers: [
    "A - This is not the correct answer, however, it is a really long answer to test this functionality",
    "B",
    "C",
    "D",
  ],
  incorrectAnswers: ["A", "B", "C"],
  correctAnswer: "D",
  question: "Which character is not A for alpha, B for Bravo og C for Charlie?",
};
