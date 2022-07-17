import React from "react";
import AnswerCard from "src/components/molecules/AnswerCard/AnswerCard";
import { QuestionCardProps } from "./types";

const QuestionCard = ({
  question,
  onPressAnswer,
  highlightCorrectAnswer,
}: QuestionCardProps) => {
  // TODO: Når man har riktig, wohoo, du fikk riktig; noe emojis / poeng som øker
  // TODO: lite tid igjen / tiden er ute, noe klokke som kommer opp
  // TODO: vise poengscore, you are in ...
  // TODO: alltid noe positivt

  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.allAnswers.map((answer, index) => (
          <AnswerCard
            key={index}
            answer={answer}
            onPress={() => onPressAnswer(question, answer)}
            highlightCorrectAnswer={
              highlightCorrectAnswer && answer === question.correctAnswer
            }
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
