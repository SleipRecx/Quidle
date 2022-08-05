import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TriviaAPI from "src/api/trivia";
import { Stats, TriviaQuestion } from "src/models/client/questions/types";
import { _firebaseService } from "src/services/firebaseService";
import { getTodaysDate } from "src/utils/time";

export interface DailyQuiz {
  questions: TriviaQuestion[];
  createdAt: number;
}
const useQuestions = () => {
  const [todaysQuestions, setTodaysQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [localStorageStats, setLocalStorageStats] = useState<Stats | undefined>(
    undefined
  );

  const fetchTodaysQuestion = async () => {
    try {
      const hasStartedTodaysQuiz = localStorage.getItem(
        `quiz-results-${getTodaysDate()}`
      );
      if (!!hasStartedTodaysQuiz) {
        setLocalStorageStats(JSON.parse(hasStartedTodaysQuiz) as Stats);
        return;
      }
      const doc = await _firebaseService.getDocument<DailyQuiz>(
        `dailyQuiz/${getTodaysDate()}`
      );
      if (doc) {
        setTodaysQuestions(doc.questions);

        return doc;
      } else {
        console.log("getting questions");
        let easyQuestions: TriviaQuestion[] = [];
        let mediumQuestions: TriviaQuestion[] = [];
        let hardQuestions: TriviaQuestion[] = [];
        while (easyQuestions.length < 8) {
          const questionsResult = await TriviaAPI.getTriviaQuestions(
            "easy",
            20
          );
          const newQuestions = questionsResult._unsafeUnwrap();
          const filteredNewQuestions = newQuestions.filter(
            (q) =>
              q.question.length < 100 &&
              q.allAnswers.filter((answer) => answer.length < 70).length ===
                q.allAnswers.length
          );
          easyQuestions = easyQuestions.concat(filteredNewQuestions);
        }
        while (mediumQuestions.length < 5) {
          const questionsResult = await TriviaAPI.getTriviaQuestions(
            "medium",
            10
          );
          const newQuestions = questionsResult._unsafeUnwrap();
          const filteredNewQuestions = newQuestions.filter(
            (q) =>
              q.question.length < 100 &&
              q.allAnswers.filter((answer) => answer.length < 70).length ===
                q.allAnswers.length
          );
          mediumQuestions = mediumQuestions.concat(filteredNewQuestions);
        }
        while (hardQuestions.length < 1) {
          const questionsResult = await TriviaAPI.getTriviaQuestions(
            "medium",
            5
          );
          const newQuestions = questionsResult._unsafeUnwrap();
          const filteredNewQuestions = newQuestions.filter(
            (q) =>
              q.question.length < 100 &&
              q.allAnswers.filter((answer) => answer.length < 70).length ===
                q.allAnswers.length
          );
          hardQuestions = hardQuestions.concat(filteredNewQuestions);
        }
        const questions = easyQuestions
          .slice(0, 8)
          .concat(
            mediumQuestions.slice(0, 5).concat(hardQuestions.slice(0, 2))
          );
        _firebaseService.set<DailyQuiz>(`dailyQuiz/${getTodaysDate()}`, {
          questions: questions,
          createdAt: new Date().getTime(),
        });
        setTodaysQuestions(questions);
        return questions;
      }
    } catch (error) {
      toast.error("Error retrieving questions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodaysQuestion();
  }, []);

  return {
    loading: loading,
    questions: todaysQuestions,
    localStorageStats: localStorageStats,
  };
};

export default useQuestions;
