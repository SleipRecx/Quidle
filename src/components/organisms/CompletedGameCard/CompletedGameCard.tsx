import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column, Row } from "src/components/atoms/layout";
import { H1, H3, P } from "src/components/atoms/typography";
import Confetti from "src/components/molecules/Confetti/Confetti";
import CountUp from "src/components/molecules/CountUp/CountUp";
import useGroupId from "src/hooks/useGroupId";
import { Highscore } from "src/models/client/highscores/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";
import { CompletedGameCardProps } from "./types";
const isUpperCase = (string: string) => /^[A-Z]*$/.test(string);
const CompletedGameCard = ({ stats }: CompletedGameCardProps) => {
  const groupId = useGroupId();
  const [maxHeight, setMaxHeight] = useState(0);
  const [name, setName] = useState("");
  const [leaderboardName, setLeaderboardName] = useState("");
  const [highscores, setHighscores] = useState<Highscore[]>([]);
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
      if (leaderboardName.length === 0) {
        toast.error("You need a leaderboard name");
        return;
      }
      if (name.length === 0) {
        toast.error("Write in a name so other users can see who you are");
        return;
      }
      setLoading(true);
      await _firebaseService.add<Highscore>("highscores", {
        createdAt: new Date().getTime(),
        date: getTodaysDate(),
        stats: stats,
        points: stats.points,
        groupId: leaderboardName,
        name: name,
      });
      toast.success("We are redirecting you to your leaderboard in a new tab", {
        duration: 4000,
        position: "bottom-center",
      });
      setTimeout(() => {
        window.open(
          `http://localhost:3000/${leaderboardName}`,
          "_blank",
          "noopener,noreferrer"
        );
        setName("");
        setLeaderboardName("");
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong " + JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const onChangeName = (text: string) => {
    setName(text);
  };

  const onChangeLeaderboardText = (text: string) => {
    if (isUpperCase(text)) {
      toast.error("We only allow lowercase in leaderboard names");
    }
    if (text.indexOf(" ") >= 0) {
      toast.error("Do not include space in a leaderboard name");
    }
    setLeaderboardName(text.replace(/\s/g, "").toLowerCase());
  };

  const fetchHighscores = async (mGroupId: string) => {
    // TODO: FETCH HIGHSCORES HERE AND RENDER THEM
    console.log("fetch");
    try {
      const mHighscores = await _firebaseService.getQueriedCollection<Highscore>(
        "highscores",
        [
          ["groupId", "==", mGroupId],
          ["date", "==", getTodaysDate()],
        ]
      );
      const sortedHighscores = mHighscores.sort(
        (highscoreA, highscoreB) => highscoreB.points - highscoreA.points
      );
      setHighscores(sortedHighscores);
      console.log("highscores", highscores);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!!groupId && highscores.length === 0) {
      fetchHighscores(groupId);
    }
  }, [groupId]);

  useEffect(() => {
    setTimeout(() => {
      setMaxHeight(150);
    }, 100);
  }, []);
  return (
    <Column fullWidth mx={"10vw"}>
      <Confetti />
      {groupId && (
        <Column mb="20vh">
          <H1 textAlign="center" mb="3vh">
            {groupId} highscore today
          </H1>
          {/* TODO: Lottie here */}
          {/*highscores.length > 0 && (
            <Column>
              <H3 bold> Current champion: {highscores[0].name}</H3>
            </Column>
          )*/}
          <Column>
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
        </Column>
      )}

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

      <Column mt={"3vh"} mb="3vh">
        <Column mb="10px">
          <Input
            placeholder="Your name (or nickname)"
            onChangeText={onChangeName}
            value={name}
          />
        </Column>
        <Column mb="10px">
          <Input
            placeholder="Name of leaderboard"
            onChangeText={onChangeLeaderboardText}
            value={leaderboardName}
          />
        </Column>
        <Button loading={loading} onClick={createLeaderboard}>
          {`Add score to ${groupId ? "another " : ""}leaderboard`}
        </Button>
      </Column>
    </Column>
  );
};

export default CompletedGameCard;
