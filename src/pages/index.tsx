import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import QuizTemplate from "src/components/templates/quiz";
import { TriviaQuestion } from "src/models/client/questions";

const Home: NextPage = () => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);

  const handleQuestions = (mQuestions: TriviaQuestion[]) => {
    setQuestions(mQuestions);
  };

  const handleError = (error: Error) => {
    toast.error(error.message);
  };

  const getQuestions = useCallback(async () => {
    const questionsResult = await TriviaAPI.getTriviaQuestions();
    questionsResult.match(handleQuestions, handleError);
  }, []);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return <QuizTemplate questions={questions} />;
};

export default Home;
