import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import Lottie from "react-lottie";
import { Column, Row } from "src/components/atoms/layout";
import Modal from "src/components/atoms/modals/Modal";
import { H4, TextBase } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import { Stats } from "src/models/client/questions/types";
import * as animationData from "../../../../public/static/animations/curious.json";
import GetInTouchCard from "../GetInTouchCard";
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

  const [color, setColor] = useState("white");

  const showSettings = false;

  const [modalContent, setModalContent] = React.useState<
    "settings" | "contact" | "How to Quidle" | "gdpr ❤️" | undefined
  >(undefined);

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
            <div>
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
                  {/*<CountUp
                    end={stats.points}
                    duration={0.6}
                    start={stats.lastPoints}
                  />*/}
                </div>
              </div>
              <Column
                center
                style={{
                  height: 40,

                  fontSize: 8,
                }}
              >
                {stats.questionHistory
                  ?.map((q) =>
                    q.isCorrect ? "🟩" : q.answer === "skip" ? "🟨" : "🟥"
                  )
                  .join("")}
              </Column>
            </div>
          ) : (
            APP_NAME
          )}
        </TextBase>
      </Column>
      <Row alignItems="center">
        {!showPoints && (
          <VscFeedback
            size={24}
            color="white"
            onClick={() => setModalContent("contact")}
          />
        )}
      </Row>
      <Modal
        isOpen={modalContent !== undefined}
        onClose={() => setModalContent(undefined)}
        title={modalContent}
      >
        {modalContent === "contact" && (
          <>
            <Column>
              <GetInTouchCard
                onComplete={() => {
                  setModalContent(undefined);
                }}
              />
            </Column>
            {/*<Column mt="20px" mb="20px">
              <TextBase fontSize={12}>
                Feel free to practice. Practice is good. Good is great. You are
                great.
              </TextBase>
            </Column>
            <Column my="10px">
              <Button onClick={onPressPracticeTrivia} style={{}}>
                Practice quiz
              </Button>
        </Column>*/}
          </>
        )}

        {modalContent === "How to Quidle" && (
          <Column>
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
            <HowToPlayCard moreExplanation name="" />
          </Column>
        )}
      </Modal>
    </Row>
  );
};

export default Header;
