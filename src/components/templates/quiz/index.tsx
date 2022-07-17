import React from "react";
import QuestionCard from "src/components/organisms/QuestionCard";
import { QuizTemplateProps } from "./types";

const QuizTemplate = ({ questions }: QuizTemplateProps) => {
  return (
    <div>
      <h1>Questions</h1>
      {questions.map((question, index) => (
        <QuestionCard key={index} question={question} />
      ))}
    </div>
  );
};

export default QuizTemplate;
