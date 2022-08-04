import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column, Row } from "src/components/atoms/layout";
import { H1, H2, H3, P, TextBase } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import useGroupId from "src/hooks/useGroupId";
import { Highscore } from "src/models/client/highscores/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";
import { CompletedGameCardProps } from "./types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DOMAIN } from "src/constants/app";

const CompletedGameCard = ({ stats }: CompletedGameCardProps) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const localStorageName = localStorage.getItem("name");

  const [highscores, setHighscores] = useState<Highscore[]>([]);

  const fetchOverallHighscores = async () => {
    try {
      const mHighscores = await _firebaseService.getQueriedCollection<Highscore>(
        "highscores",
        ["date", "==", getTodaysDate()]
      );
      const sortedHighscores = mHighscores.sort(
        (highscoreA, highscoreB) => highscoreB.points - highscoreA.points
      );
      setHighscores(sortedHighscores);
    } catch (error) {
      toast.error("error", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // TODO: delay as we want to add our score to the leaderboard first
      // Should be changed with a listener
      fetchOverallHighscores();
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMaxHeight(120);
    }, 100);
  }, []);
  return (
    <Column fullWidth mx={"10vw"}>
      <Confetti />

      <Row
        fullWidth
        justifyContent="space-between"
        height={maxHeight + 100}
        alignItems="flex-end"
      >
        <Column flex={1} mx={10}>
          <P textAlign="center">{stats.points}</P>

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
            <P textAlign="center">Points</P>
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
            <P textAlign="center">✅</P>
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
            <P textAlign="center">❌</P>
          </div>
        </Column>
      </Row>
      {/*<H2 textAlign="center" my="3vh">
        You got <CountUp end={stats.points} duration={1.5} /> points
          </H2>*/}

      {highscores.length > 0 && (
        <Column mt="10vh">
          <H1 textAlign="center" mb="3vh">
            Today&apos;s highscore 🏆
          </H1>
          <Column mb="40px">
            {highscores.map((highscore, index) => {
              return (
                <Row key={index} fullWidth>
                  <Column width={50}>{index + 1}.</Column>
                  <Column width={100}>{highscore.points}</Column>
                  <Column flex={1}>{highscore.name}</Column>
                </Row>
              );
            })}
          </Column>

          <CopyToClipboard
            text={`https://${DOMAIN}`}
            onCopy={() =>
              toast.success("www.quidle.today is copied to your clipboard", {
                position: "bottom-center",
              })
            }
          >
            <Button
              style={{
                marginBottom: 10,
                background: "green",
              }}
            >
              Invite others to play Quidle
            </Button>
          </CopyToClipboard>
        </Column>
      )}
    </Column>
  );
};

export default CompletedGameCard;
