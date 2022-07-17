import React, { useEffect, useState } from "react";
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
    <div>
      <h2>{question.question}</h2>
      <div>
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
      </div>
    </div>
  );
};

export default QuestionCard;
