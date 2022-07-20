import React, { useEffect, useState } from "react";
import { Column } from "src/components/atoms/layout";
import AnswerCard from "src/components/molecules/AnswerCard/AnswerCard";
import { QuestionCardProps } from "./types";

const QuestionCard = ({ question, onPressAnswer }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const onPress = (answer: string) => {
    setSelectedAnswer(answer);
    onPressAnswer(question, answer);
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  return (
    <Column fullWidth>
      {question.allAnswers.map((answer) => {
        return (
          <AnswerCard
            key={answer}
            answer={answer}
            onPress={() => onPress(answer)}
            isCorrect={!!selectedAnswer && answer === question.correctAnswer}
            isWrong={!!selectedAnswer && selectedAnswer === answer}
          />
        );
      })}
    </Column>
  );
};

export default QuestionCard;
