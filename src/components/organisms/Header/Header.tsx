import { useRouter } from "next/dist/client/router";
import React from "react";
import CountUp from "react-countup";
import toast from "react-hot-toast";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLeaderboard } from "react-icons/md";
import Button from "src/components/atoms/buttons/Button";
import { Column, Row } from "src/components/atoms/layout";
import Modal from "src/components/atoms/modals/Modal";
import { P, TextBase } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import useGroupId from "src/hooks/useGroupId";
import { Stats } from "src/models/client/questions/types";
import HowToPlayCard from "../HowToPlayCard/HowToPlayCard";

export type HeaderProps = {
  showPoints: boolean;
  stats: Stats;
};
const Header = ({ showPoints, stats }: HeaderProps) => {
  const router = useRouter();

  const onPressPracticeTrivia = () => {
    router.push("/practice");
  };

  const showMenu = false;
  const showSettings = false;

  const [modalContent, setModalContent] = React.useState<
    "settings" | "leaderboard" | "question" | "gdpr ❤️" | undefined
  >(undefined);

  const groupId = useGroupId();

  /*
stats.lastPoints < stats.points
                    ? "#00ff00"
                    : stats.lastPoints > stats.points
                    ? "#ff0033"
                    : "white"
  */

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
            onClick={() => setModalContent("question")}
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
              }}
            >
              <CountUp end={stats.points} duration={0.2} />
              <div
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
              </div>
            </div>
          ) : (
            APP_NAME
          )}
        </TextBase>
      </Column>
      <Row alignItems="center">
        {!showPoints && (
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
        {modalContent === "leaderboard" && (
          <Column>
            You can view leaderboards after you finish a quiz.
            <Column mt="20px" mb="20px">
              <TextBase fontSize={12}>
                Feel free to practice some basic quiz questions
              </TextBase>
            </Column>
            <Column my="10px">
              <Button onClick={onPressPracticeTrivia} style={{}}>
                Practice quiz
              </Button>
            </Column>
          </Column>
        )}
        {modalContent === "question" && (
          <Column mt="30px">
            <HowToPlayCard moreExplanation name="" />
          </Column>
        )}
        {modalContent === "gdpr ❤️" && (
          <Column mt="30px" center>
            <P>
              We respect your privacy policy, and are not storing any
              information about.
            </P>
          </Column>
        )}
      </Modal>
    </Row>
  );
};

export default Header;
