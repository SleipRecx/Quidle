import React, { useEffect, useState } from "react";
import { Column, Row } from "src/components/atoms/layout";
import { H1, P } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import { getTodaysDate } from "src/utils/time";
import { CompletedGameCardProps } from "./types";

const CompletedGameCard = ({ stats, points }: CompletedGameCardProps) => {
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    localStorage.setItem(
      `quiz-results-${getTodaysDate()}`,
      JSON.stringify(stats)
    );
  }, [stats]);

  useEffect(() => {
    setTimeout(() => {
      setMaxHeight(150);
    }, 100);
  }, []);
  return (
    <Column fullWidth mx={"10vw"}>
      <Confetti />
      <H1 textAlign="center" mb="3vh">
        <CountUp end={points} duration={1.5} /> points 🔥
      </H1>

      <Row
        fullWidth
        justifyContent="space-between"
        height={maxHeight + 100}
        alignItems="flex-end"
      >
        <Column flex={1} mx={10}>
          <P textAlign="center">{stats.questionsCount}</P>

          <div
            style={{
              transition: "height 1s ease",
              height: maxHeight,
              backgroundColor: "#9F66FF",
              width: "100%",
            }}
          ></div>
          <div
            style={{
              flex: 1,
              marginTop: 5,
              backgroundColor: "#333333",
            }}
          >
            <P textAlign="center">Total</P>
          </div>
        </Column>
        <Column flex={1}>
          <P textAlign="center">{stats.correctAnswerCount}</P>

          <div
            style={{
              transition: "height 1s ease",
              height:
                (maxHeight * stats.correctAnswerCount) / stats.questionsCount,
              backgroundColor: "#00ff00",
            }}
          ></div>
          <div
            style={{
              flex: 1,
              marginTop: 5,
              backgroundColor: "#333333",
            }}
          >
            <P textAlign="center">Correct</P>
          </div>
        </Column>
        <Column flex={1} mx={10}>
          <P textAlign="center">{stats.wrongAnswerCount}</P>
          <div
            style={{
              transition: "height 1s ease",
              height:
                (maxHeight * stats.wrongAnswerCount) / stats.questionsCount,
              backgroundColor: "#ff0033",
            }}
          ></div>
          <div
            style={{
              flex: 1,
              marginTop: 5,
              backgroundColor: "#333333",
            }}
          >
            <P textAlign="center">Close</P>
          </div>
        </Column>
      </Row>
    </Column>
  );
};

export default CompletedGameCard;
