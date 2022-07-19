import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import PracticeQuizTemplate from "src/components/templates/practiceQuiz/PracticeQuizTemplate";
import QuizTemplate from "src/components/templates/quiz/QuizTemplate";
import { DUMMY_QUESTION } from "src/models/client/questions/constants";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { generateRandom, shuffle } from "src/utils";

const PracticeMathQuizPage = () => {
  // NB: to of the same answer might appear
  const getMathQuestion = useCallback((): TriviaQuestion => {
    const number1 = generateRandom(10, 100);
    const number2 = generateRandom(10, 100);
    const diffFactor = generateRandom(1, 10);
    const correctAnswer = number1 * number2;
    const invalidAnswer1 = (number1 - diffFactor) * number2;
    const invalidAnswer2 = (number1 + diffFactor) * number2;
    const invalidAnswer3 = number1 * (number2 - diffFactor);
    const incorrectAnswers = [invalidAnswer1, invalidAnswer2, invalidAnswer3];
    const allAnswers = shuffle(
      incorrectAnswers.concat(correctAnswer)
    ).map((number) => number.toString());
    return {
      question: `What is ${number1} x ${number2}?`,
      allAnswers: allAnswers,
      correctAnswer: correctAnswer.toString(),
      incorrectAnswers: incorrectAnswers
        .map((number) => number.toString())
        .slice(3),
    };
  }, []);

  const [question, setQuestion] = useState<TriviaQuestion>(getMathQuestion());

  const updateMathQuestion = () => {
    setQuestion(getMathQuestion());
  };

  const handleCorrectAnswer = (question: TriviaQuestion, answer: string) => {};

  const handleWrongAnswer = (question: TriviaQuestion, answer: string) => {};

  const onPressAnswer = (question: TriviaQuestion, answer: string) => {
    if (question.correctAnswer === answer)
      handleCorrectAnswer(question, answer);
    else handleWrongAnswer(question, answer);

    setTimeout(() => {
      updateMathQuestion();
    }, 600);
  };

  return (
    <PracticeQuizTemplate question={question} onPressAnswer={onPressAnswer} />
  );
};

export default PracticeMathQuizPage;
