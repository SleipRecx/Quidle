import React from "react";
import { Column } from "src/components/atoms/layout";
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
}: QuizTemplateProps) => {
  return (
    <Column
      fullWidth
      backgroundColor={"#131315"}
      height={"100vh"}
      alignItems="center"
      color="white"
    >
      <Wrapper>
        <div
          style={{
            height: 100,
          }}
        ></div>
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
        <CountDown onComplete={onTimeComplete} />
        {isFinished && <CompletedGameCard stats={stats} />}
      </Wrapper>
    </Column>
  );
};

export default QuizTemplate;
