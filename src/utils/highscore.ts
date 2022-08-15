import { Highscore } from "src/models/client/highscores/types";
import {
  QuestionHistory,
  TriviaQuestion,
} from "src/models/client/questions/types";
import { getTodaysDate } from "./time";

function getMultipleRandom(arr: any[], num: number) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}

const NAMES = [
  "Freya 🐋",
  "Marty",
  "An In Last Place..",
  "Quiztin",
  "Quzzly",
  "Whiskeypedia",
  "Plunderwall",
  "B. Hansen",
  "Geir",
  "Lovestainz",
  "Balls Deep",
  "E=MC",
  "John Triviaolta",
  "Nics",
  "Stål",
  "🙏🙏",
  "Idag går det",
  "Besserwissern",
  "15 av 15",
  "Joker",
  "Quizbuster",
  "NewYork",
  "Skogfrisk",
  "Quizling",
  "Legenden",
  "Hvem er jeg?",
  "Lett",
  "Quiznos",
  "General Riot",
  "Quiz master Trondheim",
  "Halla Geir",
  "AllYouNeedIsTypescript",
  "SNART HELG",
  "Sero kunnskap",
  "Blir bedre neste gang",
  "🤠",
  "Regnvær",
  "De som vet de vet",
  "Kenya",
  "Tørnquiz?",
];

export const getUserNames = () => {
  return getMultipleRandom(NAMES, generateRandom(15, 35));
};

export const getHighscores = (questions: TriviaQuestion[]): Highscore[] => {
  return getUserNames().map((name: string) => {
    const questionHistory: QuestionHistory = questions.map((q, index) => {
      if (index <= 8) {
        // easy
        const randomNumber = Math.random();
        if (randomNumber < 0.7) {
          return {
            allAnswers: q.allAnswers,
            answer: q.correctAnswer,
            correctAnswer: q.correctAnswer,
            emoji: "🟩",
            isCorrect: true,
            question: q.question,
          };
        } else if (randomNumber < 0.9) {
          return {
            allAnswers: q.allAnswers,
            answer: "skip",
            correctAnswer: q.correctAnswer,
            emoji: "🟨",
            isCorrect: false,
            question: q.question,
          };
        } else {
          return {
            allAnswers: q.allAnswers,
            answer: q.incorrectAnswers[0],
            correctAnswer: q.correctAnswer,
            emoji: "🟥",
            isCorrect: false,
            question: q.question,
          };
        }
      } else if (index >= 9 && index <= 12) {
        // medium
        const randomNumber = Math.random();
        if (randomNumber < 0.6) {
          return {
            allAnswers: q.allAnswers,
            answer: q.correctAnswer,
            correctAnswer: q.correctAnswer,
            emoji: "🟩",
            isCorrect: true,
            question: q.question,
          };
        } else if (randomNumber < 0.7) {
          return {
            allAnswers: q.allAnswers,
            answer: "skip",
            correctAnswer: q.correctAnswer,
            emoji: "🟨",
            isCorrect: false,
            question: q.question,
          };
        } else {
          return {
            allAnswers: q.allAnswers,
            answer: q.incorrectAnswers[0],
            correctAnswer: q.correctAnswer,
            emoji: "🟥",
            isCorrect: false,
            question: q.question,
          };
        }
      } else {
        // hard
        const randomNumber = Math.random();
        if (randomNumber < 0.25) {
          return {
            allAnswers: q.allAnswers,
            answer: q.correctAnswer,
            correctAnswer: q.correctAnswer,
            emoji: "🟩",
            isCorrect: true,
            question: q.question,
          };
        } else if (randomNumber < 0.4) {
          return {
            allAnswers: q.allAnswers,
            answer: "skip",
            correctAnswer: q.correctAnswer,
            emoji: "🟨",
            isCorrect: false,
            question: q.question,
          };
        } else {
          return {
            allAnswers: q.allAnswers,
            answer: q.incorrectAnswers[0],
            correctAnswer: q.correctAnswer,
            emoji: "🟥",
            isCorrect: false,
            question: q.question,
          };
        }
      }
    });

    return {
      createdAt: new Date().getTime(),
      date: getTodaysDate(),
      name: name,
      points: questionHistory.reduce((prevV, q) => {
        return prevV + (q.isCorrect ? 1000 : q.answer === "skip" ? 0 : -500);
      }, 0),
      extra: "yes",
      stats: {
        correctAnswerCount: questionHistory.filter((q) => q.isCorrect).length,
        questionsCount: questionHistory.length,
        wrongAnswerCount: questionHistory.filter((q) => q.emoji === "🟥")
          .length,
        lastPoints: 0,
        points: questionHistory.reduce((prevV, q) => {
          return prevV + (q.isCorrect ? 1000 : q.answer === "skip" ? 0 : -500);
        }, 0),
        questionHistory: questionHistory,
      },
      questionHistory: questionHistory,
    };
  });
};
