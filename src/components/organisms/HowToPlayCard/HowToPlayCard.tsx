import React from "react";
import Button from "src/components/atoms/buttons/Button";
import Input from "src/components/atoms/inputs/Input";
import { Column, Row } from "src/components/atoms/layout";
import { H4, P } from "src/components/atoms/typography";
import { APP_NAME } from "src/constants/app";
import { HowToPlayCardProps } from "./types";
const HowToPlayCard = ({
  onPressPlay,
  moreExplanation,
  setName,
  name,
}: HowToPlayCardProps) => {
  return (
    <Column fullWidth width="100%" px="6vw">
      {!moreExplanation && (
        <Column center mb="5vh">
          <H4 textAlign="center" color="#898989">
            How to play Quidle
          </H4>
        </Column>
      )}

      <Row mb="10px">
        <Column width={"40px"} alignItems="center">
          <P textAlign="center">🏆</P>
        </Column>
        <Column flex={1}>
          <P>15 quiz questions in 90 seconds</P>
        </Column>
      </Row>
      <Row mb="10px">
        <Column width={"40px"} alignItems="center">
          <P textAlign="center">🧑‍🏫</P>
        </Column>
        <Column flex={1}>
          <P>Answer correctly (1000p), wrong (-500p) or pass (0p)</P>
        </Column>
      </Row>

      {moreExplanation && (
        <Row mb="10px">
          <Column width={40} alignItems="center">
            <P textAlign="center">🏆</P>
          </Column>
          <Column flex={1}>
            <P>
              A correct answer gives 1000 points, a wrong answer takes 500
              points from you, and a pass is a pass
            </P>
          </Column>
        </Row>
      )}

      {moreExplanation && (
        <Row mb="10px">
          <Column width={40} alignItems="center">
            <P textAlign="center">🧘</P>
          </Column>
          <Column flex={1}>
            <P>
              We are randomly selecting questions each day from a bank with over
              8000 questions.
            </P>
          </Column>
        </Row>
      )}
      <Row mb="5vh">
        <Column width={40} alignItems="center">
          <P textAlign="center">☀️</P>
        </Column>
        <Column flex={1}>
          <P>
            A new{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {APP_NAME}
            </span>{" "}
            will be available each day!
          </P>
        </Column>
      </Row>
      {!!setName && (
        <Column center mb="10px">
          <Input
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Your nickname"
          />
        </Column>
      )}
      {!!onPressPlay && (
        <Column center fullWidth>
          <Button onClick={onPressPlay} style={{}}>
            PLAY
          </Button>
        </Column>
      )}
    </Column>
  );
};

export default HowToPlayCard;
