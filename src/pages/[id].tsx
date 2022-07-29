import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import HomePage from "src/components/pages/home";
import useQuestions from "src/hooks/useQuestions";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";

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
