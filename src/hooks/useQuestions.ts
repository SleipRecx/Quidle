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
        let easyQuestions: TriviaQuestion[] = [];
        let mediumQuestions: TriviaQuestion[] = [];
        let hardQuestions: TriviaQuestion[] = [];

        const easyQuestionsResult = await TriviaAPI.getTriviaQuestions(
          "easy",
          9
        );
        if (easyQuestionsResult.isOk()) {
          easyQuestions = easyQuestionsResult._unsafeUnwrap();
        }
        const mediumQuestionsResults = await TriviaAPI.getTriviaQuestions(
          "medium",
          4
        );
        if (mediumQuestionsResults.isOk()) {
          mediumQuestions = mediumQuestionsResults._unsafeUnwrap();
        }
        const hardQuestionsResults = await TriviaAPI.getTriviaQuestions(
          "hard",
          2
        );
        if (hardQuestionsResults.isOk()) {
          hardQuestions = hardQuestionsResults._unsafeUnwrap();
        }

        const questions = easyQuestions
          .concat(mediumQuestions)
          .concat(hardQuestions);
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
