import React from "react";
import { SkipCardProps } from "./types";
import { StyledSkipCard } from "./SkipCard.styled";
const SkipCard = ({ onPress }: SkipCardProps) => {
  return <StyledSkipCard onClick={onPress}>Skip</StyledSkipCard>;
};

export default SkipCard;
