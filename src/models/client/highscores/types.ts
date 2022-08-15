import { QuestionHistory, Stats } from "../questions/types";

export interface Highscore {
  createdAt: number;
  stats: Stats;
  date: string;
  groupId?: string;
  points: number;
  extra?: string;
  name?: string;
  questionHistory: QuestionHistory;
}
