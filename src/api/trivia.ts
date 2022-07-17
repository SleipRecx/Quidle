import { errAsync, okAsync, Result } from "neverthrow";
import { TRIVIA_API_URL } from "src/constants/api";
import { TriviaQuestion } from "src/models/client/questions";
import { shuffle } from "src/utils";

class TriviaAPI {
  static async getTriviaQuestions(): Promise<Result<TriviaQuestion[], Error>> {
    try {
      const response = await fetch(
        `${TRIVIA_API_URL}?limit=50&difficulty=easy`
      );
      const responseJson = (await response.json()) as Partial<TriviaQuestion>[];
      const questions = responseJson.map((q) => ({
        ...q,
        allAnswers:
          !!q.correctAnswer && !!q.incorrectAnswers
            ? shuffle(q?.incorrectAnswers.concat(q?.correctAnswer))
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
