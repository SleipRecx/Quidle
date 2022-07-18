import React from "react";
import { Column } from "src/components/atoms/layout";
import { H1 } from "src/components/atoms/typography";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
import { Wrapper } from "../quiz/QuizTemplate.styled";
import { PracticeQuizTemplateProps } from "./types";

const PracticeQuizTemplate = ({
  question,
  onPressAnswer,
}: PracticeQuizTemplateProps) => {
  return (
    <Column
      fullWidth
      backgroundColor={"#131315"}
      height={"100vh"}
      alignItems="center"
      justifyContent="space-between"
      color="white"
    >
      {question && (
        <Wrapper>
          <Column center px={"5vw"}>
            <H1 textAlign="center">{question.question}</H1>
          </Column>
        </Wrapper>
      )}
      <Wrapper>
        {question && (
          <Column center fullWidth>
            <QuestionCard question={question} onPressAnswer={onPressAnswer} />
          </Column>
        )}
      </Wrapper>
      <Column flex={1}></Column>
    </Column>
  );
};

export default PracticeQuizTemplate;
