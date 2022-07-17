import React from "react";
import { H1 } from "src/components/atoms/typography";
import { CompletedGameCardProps } from "./types";

const CompletedGameCard = ({ stats }: CompletedGameCardProps) => {
  return (
    <div>
      <H1>Good job!</H1>
      <div>Total number of questions: {stats.questionsCount}</div>
      <div>Correct answers: {stats.correctAnswerCount}</div>
      <div>Wrong answers: {stats.wrongAnswerCount}</div>
    </div>
  );
};

export default CompletedGameCard;
