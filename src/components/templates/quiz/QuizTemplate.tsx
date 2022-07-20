import React from "react";
import { Column, Float, LoadingColumn } from "src/components/atoms/layout";
import { H1, H4, P, TextBase } from "src/components/atoms/typography";
import CountDown from "src/components/molecules/CountDown/CountDown";
import CountUp from "src/components/molecules/CountUp/CountUp";
import CompletedGameCard from "src/components/organisms/CompletedGameCard/CompletedGameCard";
import HowToPlayCard from "src/components/organisms/HowToPlayCard/HowToPlayCard";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
import { getFunnyEmoji } from "src/utils/text";
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
  onPressPracticeTrivia,
  onPressPracticeMath,
  loading,
}: QuizTemplateProps) => {
  return (
    <LoadingColumn
      fullWidth
      backgroundColor={"#131315"}
      height={"100vh"}
      alignItems="center"
      justifyContent="space-between"
      color="white"
      loading={loading}
    >
      {!isStarted && !isFinished && (
        <Column width="100vw" height="100vh" center>
          <Float bottom={"5px"}>
            <TextBase fontSize={10}>
              I just want to practice my{" "}
              <span
                onClick={onPressPracticeTrivia}
                style={{
                  textDecoration: "underline",
                }}
              >
                trivia
              </span>{" "}
              /{" "}
              <span
                onClick={onPressPracticeMath}
                style={{
                  textDecoration: "underline",
                }}
              >
                math
              </span>{" "}
              skills
            </TextBase>
          </Float>

          <Column>
            <HowToPlayCard onPressPlay={onPressPlay} />
          </Column>
        </Column>
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
            <CompletedGameCard stats={stats} />
          </Column>
        )}
      </Wrapper>
      {isStarted && !isFinished && (
        <Column center flex={1}>
          <CountDown onComplete={onTimeComplete} />
          <H4>
            <CountUp end={stats.points} /> points{" "}
            {stats.points > 0 && getFunnyEmoji()}
          </H4>
        </Column>
      )}
    </LoadingColumn>
  );
};

export default QuizTemplate;
