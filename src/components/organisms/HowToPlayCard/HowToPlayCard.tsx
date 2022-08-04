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
    <Column fullWidth maxWidth="500px" px="5vw">
      {onPressPlay && (
        <Column center mb="5vh">
          <H4 textAlign="center" color="#898989">
            HOW TO PLAY
          </H4>
        </Column>
      )}
      <Row mb="10px">
        <Column width={"40px"} alignItems="center">
          <P textAlign="center">⏳</P>
        </Column>
        <Column flex={1}>
          <P>15 quiz questions in 60 seconds</P>
        </Column>
      </Row>

      <Row mb="10px">
        <Column width={40} alignItems="center">
          <P textAlign="center">🏆</P>
        </Column>
        <Column flex={1}>
          <P>Correct answer = 1000 points</P>
        </Column>
      </Row>
      <Row mb="10px">
        <Column width={40} alignItems="center">
          <P textAlign="center">😭</P>
        </Column>
        <Column flex={1}>
          <P>Wrong answer = -500 points</P>
        </Column>
      </Row>
      <Row mb="10px">
        <Column width={40} alignItems="center">
          <P textAlign="center">🫡</P>
        </Column>
        <Column flex={1}>
          <P>Pass question = 0 points</P>
        </Column>
      </Row>
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
