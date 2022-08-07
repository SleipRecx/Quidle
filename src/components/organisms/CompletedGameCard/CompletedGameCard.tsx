import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import Button from "src/components/atoms/buttons/Button";
import { Column, Row } from "src/components/atoms/layout";
import { H1, H2, P } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import { DOMAIN } from "src/constants/app";
import { Highscore } from "src/models/client/highscores/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";
import * as sad from "../../../../public/static/animations/drenched-horse.json";
import * as ok from "../../../../public/static/animations/curious.json";
import * as relax from "../../../../public/static/animations/relax.json";
import * as happy from "../../../../public/static/animations/singing-horse.json";
import * as smiling from "../../../../public/static/animations/smiling-horse.json";
import { CompletedGameCardProps } from "./types";
import Countdown from "react-countdown";

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
        <div
          style={{
            width: "100%",
            marginLeft: "20px",
          }}
        >
          <H2 my="3px">
            You got <CountUp end={stats.points} duration={1.5} /> points
          </H2>
        </div>
      </div>
      <P>
        You answered {stats.correctAnswerCount} questions correctly,{" "}
        {stats.wrongAnswerCount} wrong, and passed on{" "}
        {stats.questionsCount -
          stats.correctAnswerCount -
          stats.wrongAnswerCount}{" "}
        out of {stats.questionsCount} questions in total.
      </P>

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
      {/*<H2 textAlign="center" my="3vh">
        You got <CountUp end={stats.points} duration={1.5} /> points
          </H2>*/}

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
          <H1 textAlign="center" mb="3vh">
            Today&apos;s highscore 🏆
          </H1>
          <Column mb="40px">
            {highscores.map((highscore, index) => {
              return (
                <Row key={index} fullWidth>
                  <Column width={50}>{index + 1}.</Column>
                  <Column width={100}>
                    <CountUp end={highscore.points} duration={0.6} />
                  </Column>
                  <Column flex={1}>{highscore.name}</Column>
                </Row>
              );
            })}
          </Column>

          <CopyToClipboard
            text={`https://${DOMAIN}`}
            onCopy={() =>
              toast.success("www.quidle.app is copied to your clipboard", {
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
