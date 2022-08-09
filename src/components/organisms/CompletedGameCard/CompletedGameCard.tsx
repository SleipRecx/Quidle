import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Countdown from "react-countdown";
import ReactGA from "react-ga";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import SimpleButton from "src/components/atoms/buttons/SimpleButton";
import { Column, Row } from "src/components/atoms/layout";
import { H1, H2, P, TextBase } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import { Highscore } from "src/models/client/highscores/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate, getTodaysDateDDMM } from "src/utils/time";
import * as sad from "../../../../public/static/animations/drenched-horse.json";
import * as relax from "../../../../public/static/animations/relax.json";
import * as happy from "../../../../public/static/animations/singing-horse.json";
import * as smiling from "../../../../public/static/animations/smiling-horse.json";
import { CompletedGameCardProps } from "./types";

const CompletedGameCard = ({ stats }: CompletedGameCardProps) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const localStorageName = localStorage.getItem("name");

  const [showStats, setShowStats] = useState(true);

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

  const toggleStats = () => {
    setShowStats(!showStats);
    ReactGA.event({
      action: "Toggle stats",
      category: "Stats",
    });
  };

  const onCopy = () => {
    toast.success("Copied results to clipboard", {
      position: "bottom-center",
    });
    ReactGA.event({
      action: "Copy results",
      category: "Share",
    });
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

  const dateRenderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return (
    <Column fullWidth mx={"10vw"} mt="3vh">
      <Confetti />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <div>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData:
                  stats.points > 10000
                    ? smiling
                    : stats.points > 4000
                    ? happy
                    : stats.points > 0
                    ? relax
                    : stats.points === 0
                    ? relax
                    : sad,
              }}
              height={100}
            />
          </div>
          <H1 my="3px" textAlign="center" marginTop="5px">
            You got <CountUp end={stats.points} duration={1.5} /> points
          </H1>
        </div>
      </div>
      <Row justifyContent="center" mt="5px">
        <Column width={120} mr="5px">
          <SimpleButton onClick={toggleStats}>Toggle stats</SimpleButton>
        </Column>
        <Column width={120} ml="5px">
          <CopyToClipboard
            text={`Quidle ${getTodaysDateDDMM()} ${stats.correctAnswerCount}/${
              stats.questionsCount
            }\n${stats.questionHistory
              .map((q) => q.emoji)
              .join("")
              .replace(" ", "")}`}
            onCopy={onCopy}
          >
            <SimpleButton
              style={{
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Share
            </SimpleButton>
          </CopyToClipboard>
        </Column>
      </Row>

      {showStats && (
        <Column mt="10px">
          <Row>
            <Column flex={3}>
              <TextBase fontSize={12} bold>
                Question
              </TextBase>
            </Column>
            <Column flex={1}>
              <TextBase fontSize={12} bold>
                You
              </TextBase>
            </Column>
            <Column flex={1}>
              <TextBase fontSize={12} bold>
                Correct
              </TextBase>
            </Column>
          </Row>
          {stats.questionHistory.map((question, index) => {
            return (
              <Row key={index} mb="5px">
                <Column flex={3}>
                  <TextBase fontSize={11}>{question.question}</TextBase>
                </Column>
                <Column flex={1}>
                  <TextBase
                    fontSize={11}
                    color={
                      question.isCorrect
                        ? "#00ff00"
                        : question.answer === "skip"
                        ? "yellow"
                        : "#ff0033"
                    }
                  >
                    {question.answer === "skip"
                      ? "Question skipped"
                      : question.answer}
                  </TextBase>
                </Column>
                <Column flex={1}>
                  <TextBase fontSize={11}>{question.correctAnswer}</TextBase>
                </Column>
              </Row>
            );
          })}
        </Column>
      )}

      <div
        style={{
          height: 1,
          marginTop: 20,
          marginBottom: 20,
          width: "100%",
          backgroundColor: "#3a3a3c",
        }}
      ></div>

      <P textAlign="center">Next Quidle</P>
      <H2 textAlign="center">
        <Countdown date={tomorrow} renderer={dateRenderer} />
      </H2>

      <div
        style={{
          height: 1,
          marginTop: 20,
          marginBottom: 20,
          width: "100%",
          backgroundColor: "#3a3a3c",
        }}
      ></div>

      {highscores.length > 0 && (
        <Column mt="20px">
          <H1 textAlign="center" mb="10px">
            Today&apos;s highscore 🏆
          </H1>

          <Column mb="40px">
            <Row fullWidth>
              <Column
                width={30}
                style={{
                  fontWeight: "bold",
                }}
              ></Column>
              <Column
                width={130}
                style={{
                  fontWeight: "bold",
                }}
              >
                Player
              </Column>
              <Column
                width={70}
                style={{
                  fontWeight: "bold",
                }}
              >
                Score
              </Column>
              <Column
                flex={1}
                style={{
                  fontWeight: "bold",
                }}
              >
                Game
              </Column>
            </Row>
            {highscores.map((highscore, index) => {
              return (
                <Row
                  fullWidth
                  key={index}
                  style={{
                    fontSize: 14,
                  }}
                >
                  <Column width={30}>{index + 1}.</Column>
                  <Column width={130}>{highscore.name}</Column>
                  <Column width={70}>
                    <CountUp end={highscore.points} duration={0.6} />
                  </Column>

                  <Column flex={1} justifyContent="center">
                    <TextBase fontSize={"5px"}>
                      {highscore.questionHistory?.map((q) => q.emoji)}{" "}
                    </TextBase>
                  </Column>
                </Row>
              );
            })}
          </Column>
        </Column>
      )}
    </Column>
  );
};

export default CompletedGameCard;
