import type { NextPage } from "next";
import React from "react";
import PracticeMathQuizPage from "src/components/pages/practice/math";

// Note: pre-render functions such as getStaticProps can be used here
const PracticeMathQuiz: NextPage = () => {
  return <PracticeMathQuizPage />;
};

export default PracticeMathQuiz;
