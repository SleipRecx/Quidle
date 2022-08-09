export interface TriviaQuestion {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  allAnswers: string[];
}

export type QuestionHistory = {
  answer: string;
  correctAnswer: string;
  allAnswers: string[];
  isCorrect: boolean;
  question: string;
  emoji: "🟥" | "⬛️" | "🟩" | "🟨";
}[];

export type Stats = {
  correctAnswerCount: number;
  wrongAnswerCount: number;
  questionsCount: number;
  points: number;
  lastPoints: number;
  questionHistory: QuestionHistory;
};
