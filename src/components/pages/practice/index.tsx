import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import PracticeQuizTemplate from "src/components/templates/practiceQuiz/PracticeQuizTemplate";
import { TriviaQuestion } from "src/models/client/questions/types";

const PracticeQuizPage = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleQuestions = (mQuestions: TriviaQuestion[]) => {
    setQuestions(mQuestions);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const onPressAnswer = (question: TriviaQuestion, answer: string) => {
    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 600);
  };

  const getQuestions = useCallback(async () => {
    const questionsResult = await TriviaAPI.getTriviaQuestions();
    questionsResult.match(handleQuestions, handleError);
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const question =
    currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : undefined;

  return (
    <PracticeQuizTemplate question={question} onPressAnswer={onPressAnswer} />
  );
};

export default PracticeQuizPage;
