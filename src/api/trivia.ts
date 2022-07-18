import { errAsync, okAsync, Result } from "neverthrow";
import { TRIVIA_API_URL } from "src/constants/api";
import { TriviaQuestion } from "src/models/client/questions/types";
import { shuffle } from "src/utils";

class TriviaAPI {
  static async getTriviaQuestions(): Promise<Result<TriviaQuestion[], Error>> {
    try {
      const responseEasy = await fetch(
        `${TRIVIA_API_URL}?limit=20&difficulty=easy`
      );
      const responseJsonEasy = (await responseEasy.json()) as Partial<TriviaQuestion>[];

      const responseMedium = await fetch(
        `${TRIVIA_API_URL}?limit=20&difficulty=medium`
      );
      const responseJsonMedium = (await responseMedium.json()) as Partial<TriviaQuestion>[];

      const questions = responseJsonEasy
        .concat(responseJsonMedium)
        .map((q) => ({
          ...q,
          allAnswers:
            !!q.correctAnswer && !!q.incorrectAnswers
              ? shuffle(
                  q?.incorrectAnswers.slice(0, 3).concat(q?.correctAnswer)
                )
              : [],
        })) as TriviaQuestion[];

      return okAsync(questions);
    } catch (error) {
      return errAsync(
        new Error(
          "Something went wrong with fetching questions: " +
            JSON.stringify(error)
        )
      );
    }
  }
}

export default TriviaAPI;
