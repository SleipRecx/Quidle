import React from "react";
import { AnswerCardProps } from "./types";
import { StyledAnswerCard } from "./AnswerCard.styled";
const AnswerCard = ({
  answer,
  onPress,
  highlightCorrectAnswer,
}: AnswerCardProps) => {
  return (
    <StyledAnswerCard onClick={onPress} highlighted={highlightCorrectAnswer}>
      {answer}
    </StyledAnswerCard>
  );
};

export default AnswerCard;
