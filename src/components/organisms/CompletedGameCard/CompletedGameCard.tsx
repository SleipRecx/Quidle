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
  const groupId = useGroupId();
  const [maxHeight, setMaxHeight] = useState(0);
  const localStorageName = localStorage.getItem("name");

  const [name, setName] = useState(localStorageName);
  const [highscores, setHighscores] = useState<Highscore[]>([]);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(
    localStorage.getItem(`highscore-submitted-${getTodaysDate()}`) !== "yes"
  );

  const addScore = async () => {
    try {
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
        groupId: groupId ? groupId.toLowerCase() : null,
        name: name,
      });
      localStorage.setItem("name", name);

      setName("");
      if (groupId) {
        fetchHighscores(groupId);
      } else {
        fetchOverallHighscores();
      }
    } catch (error) {
      toast.error("Something went wrong " + JSON.stringify(error));
      console.log("error", error);
    } finally {
      setShowInput(false);
      localStorage.setItem(`highscore-submitted-${getTodaysDate()}`, "yes");
      setLoading(false);
    }
  };

  const onChangeName = (text: string) => {
    setName(text);
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
    if (!!groupId && highscores.length === 0) {
      setTimeout(() => {
        // TODO: delay as we want to add our score to the leaderboard first
        // Should be changed with a listener
        fetchHighscores(groupId);
      }, 500);
    } else {
      setTimeout(() => {
        // TODO: delay as we want to add our score to the leaderboard first
        // Should be changed with a listener
        fetchOverallHighscores();
      }, 500);
    }
  }, [groupId]);

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

      {showInput && (
        <Column mb="5px" mt="30px">
          <Input
            placeholder="Your nickname"
            onChangeText={onChangeName}
            value={name}
          />
        </Column>
      )}
      {showInput && (
        <Column mb="5px">
          <Button
            loading={loading}
            onClick={addScore}
            style={{
              marginBottom: 10,
              background: "orange",
            }}
          >
            {`Add score`}
          </Button>
        </Column>
      )}
      {highscores.length > 0 && (
        <Column mt="10vh">
          <H1 textAlign="center" mb="3vh">
            {groupId ? groupId.toLowerCase() : "Today's highscore 🏆"}
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
            text={
              groupId ? `https://${DOMAIN}/${groupId}` : `https://${DOMAIN}`
            }
            onCopy={() =>
              toast.success("Copied link to clipboard", {
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
              Invite others
            </Button>
          </CopyToClipboard>
        </Column>
      )}

      <Column mt={"20vh"} mb="3vh">
        {/*<Column mb="10px">
          <Input
            placeholder="Name of leaderboard"
            onChangeText={onChangeLeaderboardText}
            value={leaderboardName}
          />
          </Column>*/}

        {/*<TextBase fontSize={12} textAlign="center" color="#747474" mt="8px">
          If the leaderboard does not exist, we will create one for you so you
          can invite others
        </TextBase>*/}
      </Column>
    </Column>
  );
};

export default CompletedGameCard;
