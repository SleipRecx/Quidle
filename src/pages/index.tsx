import type { NextPage } from "next";
import React from "react";
import HomePage from "src/components/pages/home";
import useQuestions from "src/hooks/useQuestions";
import { TriviaQuestion } from "src/models/client/questions/types";

export interface DailyQuiz {
  questions: TriviaQuestion[];
  createdAt: number;
}

export async function getServerSideProps() {
  // Here we could fetch the documents
  return {
    props: {}, // will be passed to the page component as props
  };
}

const Home: NextPage = () => {
  const { loading, questions, localStorageStats } = useQuestions();

  return (
    <HomePage
      loading={loading}
      questions={questions}
      localStorageStats={localStorageStats}
    />
  );
};

export default Home;
