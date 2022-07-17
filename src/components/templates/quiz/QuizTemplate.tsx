import React from "react";
import { Column } from "src/components/atoms/layout";
import { H1, H4 } from "src/components/atoms/typography";
import QuestionCard from "src/components/organisms/QuestionCard";
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
        {isFinished && (
          <div>
            <H1>Good job!</H1>
            <div>Total number of questions: {stats.questionsCount}</div>
            <div>Correct answers: {stats.correctAnswerCount}</div>
            <div>Wrong answers: {stats.wrongAnswerCount}</div>
            <H4>You are the 2nd best today!</H4>
          </div>
        )}
      </Wrapper>
    </Column>
  );
};

export default QuizTemplate;
