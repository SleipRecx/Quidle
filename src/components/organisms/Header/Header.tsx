import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLeaderboard } from "react-icons/md";
import Button from "src/components/atoms/buttons/Button";
import { Column, Row } from "src/components/atoms/layout";
import Modal from "src/components/atoms/modals/Modal";
import { H4, P, TextBase } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import useGroupId from "src/hooks/useGroupId";
import { Stats } from "src/models/client/questions/types";
import HowToPlayCard from "../HowToPlayCard/HowToPlayCard";
import Lottie from "react-lottie";
import * as animationData from "../../../../public/static/animations/curious.json";

export type HeaderProps = {
  showPoints: boolean;
  stats: Stats;
};
const Header = ({ showPoints, stats }: HeaderProps) => {
  const router = useRouter();

  const onPressPracticeTrivia = () => {
    router.push("/practice");
  };

  const [color, setColor] = useState("white");

  const showMenu = false;
  const showSettings = false;

  const [modalContent, setModalContent] = React.useState<
    "settings" | "leaderboard" | "How to Quidle" | "gdpr ❤️" | undefined
  >(undefined);

  const groupId = useGroupId();

  useEffect(() => {
    if (stats.lastPoints < stats.points) setColor("#00ff00");
    if (stats.lastPoints > stats.points) setColor("#ff0033");
    if (stats.lastPoints === stats.points) setColor("white");

    setTimeout(() => {
      setColor("white");
    }, 600);
  }, [stats]);

  return (
    <Row
      fullWidth
      borderBottom="1px solid #3a3a3c"
      py="6px"
      alignItems="center"
      justifyContent="space-between"
      px="2vw"
    >
      <Row alignItems="center">
        {/*<FiMenu
          size={26}
          color="white"
          style={{
            marginRight: "1vw",
          }}
          onClick={() => setModalContent("gdpr ❤️")}
        />*/}
        {!showPoints && (
          <AiOutlineQuestionCircle
            size={24}
            color="white"
            onClick={() => setModalContent("How to Quidle")}
          />
        )}
      </Row>
      <Column>
        <TextBase bold fontSize={30}>
          {showPoints ? (
            <div
              style={{
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: color,
                }}
              >
                <CountUp
                  end={stats.points}
                  duration={0.6}
                  start={stats.lastPoints}
                />
              </div>
              {/*<div
                style={{
                  height: 12,
                  color:
                    stats.lastPoints < stats.points
                      ? "#00ff00"
                      : stats.lastPoints > stats.points
                      ? "#ff0033"
                      : "white",
                  fontSize: 10,
                }}
              >
                {stats.lastPoints < stats.points
                  ? `+ ${stats.points - stats.lastPoints}`
                  : stats.lastPoints > stats.points
                  ? `- ${stats.lastPoints - stats.points}`
                  : ""}
                </div>*/}
            </div>
          ) : (
            APP_NAME
          )}
        </TextBase>
      </Column>
      <Row alignItems="center" width={24}>
        {!showPoints && false && (
          <MdOutlineLeaderboard
            size={24}
            color="white"
            onClick={() => setModalContent("leaderboard")}
            style={{
              marginRight: "1vw",
            }}
          />
        )}

        {showSettings && (
          <IoMdSettings
            size={24}
            color="white"
            onClick={() => setModalContent("settings")}
          />
        )}
      </Row>
      <Modal
        isOpen={modalContent !== undefined}
        onClose={() => setModalContent(undefined)}
        title={modalContent}
      >
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
            }}
            height={100}
          />
        </div>
        <Column fullWidth center mt="20px" mb="20px">
          <H4 bold>How to Quidle</H4>
        </Column>
        {modalContent === "settings" && (
          <>
            <Column mt="20px" mb="20px">
              <TextBase fontSize={12}>
                Feel free to practice. Practice is good. Good is great. You are
                great.
              </TextBase>
            </Column>
            <Column my="10px">
              <Button onClick={onPressPracticeTrivia} style={{}}>
                Practice quiz
              </Button>
            </Column>
          </>
        )}

        {modalContent === "How to Quidle" && (
          <Column>
            <HowToPlayCard moreExplanation name="" />
          </Column>
        )}
      </Modal>
    </Row>
  );
};

export default Header;
