import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column, Row } from "src/components/atoms/layout";
import { H1, P } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";
import { CompletedGameCardProps } from "./types";

const CompletedGameCard = ({ stats }: CompletedGameCardProps) => {
  const router = useRouter();
  const [maxHeight, setMaxHeight] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(`quiz-results-${getTodaysDate()}`)) {
      localStorage.setItem(
        `quiz-results-${getTodaysDate()}`,
        JSON.stringify(stats)
      );
      _firebaseService.add("highscores", {
        createdAt: new Date().getTime(),
        date: getTodaysDate(),
        stats: stats,
        points: stats.points,
      });
    }
  }, [stats]);

  const createLeaderboard = async () => {
    try {
      setLoading(true);
      await _firebaseService.add("highscores", {
        createdAt: new Date().getTime(),
        date: getTodaysDate(),
        stats: stats,
        points: stats.points,
        groupId: name,
      });
      toast.success("We are redirecting you to your leaderboard in a new tab", {
        duration: 4000,
        position: "bottom-center",
      });
      setTimeout(() => {
        window.open(
          `http://localhost:3000/${name}`,
          "_blank",
          "noopener,noreferrer"
        );
      }, 2000);

      setName("");
    } catch (error) {
      toast.error("Something went wrong " + JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const onChangeLeaderboardText = (text: string) => {
    setName(text.replace(/\s/g, ""));
  };

  useEffect(() => {
    setTimeout(() => {
      setMaxHeight(150);
    }, 100);
  }, []);
  return (
    <Column fullWidth mx={"10vw"}>
      <Confetti />
      <H1 textAlign="center" mb="3vh">
        <CountUp end={stats.points} duration={1.5} /> points 🔥
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
            <P textAlign="center">Incorrect</P>
          </div>
        </Column>
      </Row>
      <Column mt="3vh">
        <Column mb="10px">
          <Input
            placeholder="Name of leaderboard"
            onChangeText={onChangeLeaderboardText}
            value={name}
          />
        </Column>
        <Button loading={loading} onClick={createLeaderboard}>
          Add score to leaderboard
        </Button>
      </Column>
    </Column>
  );
};

export default CompletedGameCard;
