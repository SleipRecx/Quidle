import React from "react";
import { AnswerCardProps } from "./types";
import { StyledAnswerCard } from "./AnswerCard.styled";
const AnswerCard = ({
  answer,
  onPress,
  isCorrect,
  isWrong,
}: AnswerCardProps) => {
  return (
    <StyledAnswerCard onClick={onPress} isCorrect={isCorrect} isWrong={isWrong}>
      {answer}
    </StyledAnswerCard>
  );
};

export default AnswerCard;
