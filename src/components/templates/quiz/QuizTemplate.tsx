import React from "react";
import {
  Column,
  Float,
  LoadingColumn,
  Sticky,
} from "src/components/atoms/layout";
import { H1 } from "src/components/atoms/typography";
import CountDown from "src/components/molecules/CountDown/CountDown";
import CompletedGameCard from "src/components/organisms/CompletedGameCard/CompletedGameCard";
import Header from "src/components/organisms/Header/Header";
import HowToPlayCard from "src/components/organisms/HowToPlayCard/HowToPlayCard";
import QuestionCard from "src/components/organisms/QuestionCard/QuestionCard";
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
  loading,
  setName,
  name,
}: QuizTemplateProps) => {
  return (
    <LoadingColumn
      fullWidth
      backgroundColor={"#131315"}
      minHeight={"100vh"}
      alignItems="center"
      justifyContent="flex-start"
      color="white"
      loading={loading}
    >
      <Sticky fullWidth>
        <Header showPoints={isStarted && !isFinished} stats={stats} />
      </Sticky>

      {!isStarted && !isFinished && (
        <Column width="100vw" height="100%" alignItems="center" mt="15vh">
          <Column>
            <HowToPlayCard
              onPressPlay={onPressPlay}
              setName={setName}
              name={name}
            />
          </Column>
        </Column>
      )}
      {isStarted && !isFinished && (
        <Float top={50} fullWidth center>
          <Column mt="3vh" center>
            <Wrapper>
              <CountDown onComplete={onTimeComplete} progressBar />
            </Wrapper>
          </Column>
        </Float>
      )}
      {/*isStarted && !question && (
        <Column center px={"5vw"} height={"35vh"}>
          <H1 textAlign="center">
            You were quick 💨 There are no more questions today, and you still
            have to wait the remaining time of 60 seconds to view your score!
          </H1>
        </Column>
      )*/}

      {!isFinished && question && isStarted && (
        <Wrapper>
          <Column
            center
            px={"5px"}
            minHeight={"25vh"}
            marginTop={50}
            marginBottom={20}
          >
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
          <Column width="100%" mt="5vh" center>
            <CompletedGameCard stats={stats} />
          </Column>
        )}
      </Wrapper>
    </LoadingColumn>
  );
};

export default QuizTemplate;
