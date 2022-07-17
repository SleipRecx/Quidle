import React, { useCallback } from "react";
import AnswerCard from "src/components/molecules/AnswerCard";
import { shuffle } from "src/utils";
import { QuestionCardProps } from "./types";

const QuestionCard = ({ question }: QuestionCardProps) => {
  const getAnswers = useCallback(() => {
    const answers = question.incorrectAnswers.concat(question.correctAnswer);
    return shuffle(answers);
  }, [question]);

  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {getAnswers().map((answer, index) => (
          <AnswerCard key={index} answer={answer} />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
