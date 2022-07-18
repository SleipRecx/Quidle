import React from "react";
import { Column, Float } from "src/components/atoms/layout";
import { H1, H2, H4 } from "src/components/atoms/typography";
import CountUp from "src/components/molecules/CountUp/CountUp";
import CompletedGameCard from "src/components/organisms/CompletedGameCard/CompletedGameCard";
import HowToPlayCard from "src/components/organisms/HowToPlayCard/HowToPlayCard";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
import { getFunnyEmoji } from "src/utils/text";
import CountDown from "../../molecules/CountDown/CountDown";
import { Wrapper } from "./QuizTemplate.styled";
import { QuizTemplateProps } from "./types";

const QuizTemplate = ({
  question,
  onPressAnswer,
  onTimeComplete,
  onPressPlay,
  isStarted,
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
      {!isStarted && !isFinished && (
        <Wrapper>
          <HowToPlayCard onPressPlay={onPressPlay} />
        </Wrapper>
      )}

      {!isFinished && question && isStarted && (
        <Wrapper>
          <Column center px={"5vw"}>
            <H1 textAlign="center">{question.question}</H1>
          </Column>
        </Wrapper>
      )}
      <Wrapper>
        {!isFinished && question && isStarted && (
          <Column center fullWidth>
            <QuestionCard question={question} onPressAnswer={onPressAnswer} />
          </Column>
        )}

        {isFinished && (
          <Column width="100vw" height="100vh" center>
            <CompletedGameCard stats={stats} points={points} />
          </Column>
        )}
      </Wrapper>
      {isStarted && !isFinished && (
        <Column center flex={1}>
          <CountDown onComplete={onTimeComplete} />
          <H4>
            <CountUp end={points} /> points {points > 0 && getFunnyEmoji()}
          </H4>
        </Column>
      )}
    </Column>
  );
};

export default QuizTemplate;
