export interface TriviaQuestion {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
}

export type Stats = {
  correctAnswerCount: number;
  wrongAnswerCount: number;
  questionsCount: number;
  points: number;
  lastPoints: number;
};
