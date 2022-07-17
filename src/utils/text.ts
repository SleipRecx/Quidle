import { GOOD_JOB_QUOTES, YOU_CAN_DO_BETTER_QUOTES } from "src/constants/text";
import { getRandomElementInArray } from ".";

export const getRightAnswerQuote = () => {
  return getRandomElementInArray(GOOD_JOB_QUOTES);
};

export const getWrongAnswerQuote = () => {
  return getRandomElementInArray(YOU_CAN_DO_BETTER_QUOTES);
};
