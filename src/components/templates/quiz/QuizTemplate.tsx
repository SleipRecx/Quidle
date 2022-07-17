import React from "react";
import { Column, Float } from "src/components/atoms/layout";
import { H4 } from "src/components/atoms/typography";
import CompletedGameCard from "src/components/organisms/CompletedGameCard/CompletedGameCard";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
import CountDown from "../../molecules/Countdown/CountDown";
import { Wrapper } from "./QuizTemplate.styled";
import { QuizTemplateProps } from "./types";

const QuizTemplate = ({
  questions,
  onPressAnswer,
  questionIndex,
  highlightCorrectAnswer,
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
      justifyContent="center"
      color="white"
    >
      <Wrapper>
        {!isFinished && questionIndex < questions.length && (
          <QuestionCard
            question={questions[questionIndex]}
            onPressAnswer={onPressAnswer}
            highlightCorrectAnswer={highlightCorrectAnswer}
          />
        )}
        <div
          style={{
            height: 30,
          }}
        ></div>

        {isFinished && <CompletedGameCard stats={stats} />}
      </Wrapper>
      <Float bottom={"5vh"}>
        <Column center>
          <CountDown onComplete={onTimeComplete} />
          <H4>{points} points</H4>
        </Column>
      </Float>
    </Column>
  );
};

export default QuizTemplate;
