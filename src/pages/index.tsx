import type { NextPage } from "next";
import React from "react";
import QuizPage from "src/components/pages/quiz";

// Note: pre-render functions such as getStaticProps can be used here
const Home: NextPage = () => {
  return <QuizPage />;
};

export default Home;
