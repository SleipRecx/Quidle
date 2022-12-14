import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import QuizTemplate from "src/components/templates/quiz/QuizTemplate";
import { Highscore } from "src/models/client/highscores/types";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";
import { HomePageProps } from "./types";

const HomePage = ({ questions, loading, localStorageStats }: HomePageProps) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [unableToPressAnswer, setUnableToPressAnswer] = useState(false);

  useEffect(() => {
    const localStorageName = localStorage.getItem("name");
    if (!!localStorageName) setName(localStorageName);
  }, []);
  const [name, setName] = useState("");
  const [lastQuestionAnsweredTime, setLastQuestionAnsweredTime] = useState(
    new Date().getTime()
  );

  const [stats, setStats] = useState<Stats>({
    correctAnswerCount: 0,
    questionsCount: 0,
    wrongAnswerCount: 0,
    points: 0,
    lastPoints: 0,
    questionHistory: [],
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const handleCorrectAnswer = (question: TriviaQuestion, answer: string) => {
    // This part is for Kahoot scoring

    setStats({
      ...stats,
      correctAnswerCount: stats.correctAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
      points: 1000 + stats.points,
      lastPoints: stats.points,
      questionHistory: stats.questionHistory.concat({
        allAnswers: question.allAnswers,
        emoji: "🟩",
        answer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect: true,
        question: question.question,
      }),
    });
  };

  const handleWrongAnswer = (question: TriviaQuestion, answer: string) => {
    setStats({
      ...stats,
      wrongAnswerCount: stats.wrongAnswerCount + 1,
      questionsCount: stats.questionsCount + 1,
      points: stats.points - 500,
      lastPoints: stats.points,
      questionHistory: stats.questionHistory.concat({
        allAnswers: question.allAnswers,
        emoji: "🟥",
        answer: answer,
        correctAnswer: question.correctAnswer,
        question: question.question,
        isCorrect: false,
      }),
    });
  };

  const onPressAnswer = (question: TriviaQuestion, answer: string) => {
    if (unableToPressAnswer) return;
    if (answer === "skip") {
      setStats({
        ...stats,
        questionsCount: stats.questionsCount + 1,
        points: stats.points,
        lastPoints: stats.points,
        questionHistory: stats.questionHistory.concat({
          allAnswers: question.allAnswers,
          emoji: "🟨",
          answer: "skip",
          correctAnswer: question.correctAnswer,
          isCorrect: false,
          question: question.question,
        }),
      });
      if (currentQuestionIndex === questions.length - 1) setIsFinished(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLastQuestionAnsweredTime(new Date().getTime());
    } else {
      setUnableToPressAnswer(true);
      if (question.correctAnswer === answer)
        handleCorrectAnswer(question, answer);
      else handleWrongAnswer(question, answer);

      setTimeout(() => {
        setUnableToPressAnswer(false);
        if (currentQuestionIndex === questions.length - 1) setIsFinished(true);

        setLastQuestionAnsweredTime(new Date().getTime());
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 600);
    }
  };

  const onTimeComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  const question =
    currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : undefined;

  const onPressPlay = () => {
    if (name.length === 0) {
      toast(`You need a name so we can show others that you beat them`, {
        position: "bottom-center",
        icon: "😏",
      });
      return;
    }
    if (!!window) window.scrollTo(0, 0);
    localStorage.setItem("name", name);
    setIsStarted(true);
  };

  const updateHighscore = useCallback(async () => {
    if (!localStorage.getItem(`quiz-results-${getTodaysDate()}`)) {
      localStorage.setItem(
        `quiz-results-${getTodaysDate()}`,
        JSON.stringify(stats)
      );
      _firebaseService.add<Highscore>("highscores", {
        createdAt: new Date().getTime(),
        date: getTodaysDate(),
        stats: stats,
        points: stats.points,
        name: name,
        questionHistory: stats.questionHistory,
      });
    }
  }, [stats, name]);

  useEffect(() => {
    if (isFinished) {
      updateHighscore();
    }
  }, [isFinished, updateHighscore]);

  return (
    <QuizTemplate
      question={question}
      onPressAnswer={onPressAnswer}
      onTimeComplete={onTimeComplete}
      onPressPlay={onPressPlay}
      stats={localStorageStats || stats}
      isFinished={isFinished || !!localStorageStats}
      isStarted={isStarted}
      setName={setName}
      name={name}
      loading={loading}
    />
  );
};

export default HomePage;
