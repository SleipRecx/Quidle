import type { NextPage } from "next";
import React from "react";
import PracticeQuizPage from "src/components/pages/practiceQuiz";

// Note: pre-render functions such as getStaticProps can be used here
const Practice: NextPage = () => {
  return <PracticeQuizPage />;
};

export default Practice;
