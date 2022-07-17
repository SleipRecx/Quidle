import { errAsync, okAsync, Result } from "neverthrow";
import { TRIVIA_API_URL } from "src/constants/api";
import { TriviaQuestion } from "src/models/client/questions";

class TriviaAPI {
  static async getTriviaQuestions(): Promise<Result<TriviaQuestion[], Error>> {
    try {
      const response = await fetch(`${TRIVIA_API_URL}?limit=5&difficulty=easy`);
      const responseJson = await response.json();
      return okAsync(responseJson);
    } catch (error) {
      return errAsync(
        new Error("Something went wrong with fetching giftItems")
      );
    }
  }
}

export default TriviaAPI;
