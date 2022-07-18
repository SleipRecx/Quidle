import React from "react";
import { Column, Float } from "src/components/atoms/layout";
import { H1, H2, H4 } from "src/components/atoms/typography";
import CompletedGameCard from "src/components/organisms/CompletedGameCard/CompletedGameCard";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
import CountDown from "../../molecules/Countdown/CountDown";
import { Wrapper } from "./QuizTemplate.styled";
import { QuizTemplateProps } from "./types";

const QuizTemplate = ({
  question,
  onPressAnswer,
  onTimeComplete,
  isFinished,
  stats,
  points,
}: QuizTemplateProps) => {
  return (
    <Column
      fullWidth
      backgroundColor={"#131315"}
      height={"100vh"}
      alignItems="center"
      justifyContent="space-between"
      color="white"
    >
      {!isFinished && question && (
        <Wrapper>
          <Column center px={"5vw"}>
            <H1 textAlign="center">{question.question}</H1>
          </Column>
        </Wrapper>
      )}
      <Wrapper>
        {!isFinished && question && (
          <QuestionCard question={question} onPressAnswer={onPressAnswer} />
        )}

        {isFinished && <CompletedGameCard stats={stats} />}
      </Wrapper>
      <Column center flex={1}>
        <CountDown onComplete={onTimeComplete} />
        <H4>{points} points</H4>
      </Column>
    </Column>
  );
};

export default QuizTemplate;
