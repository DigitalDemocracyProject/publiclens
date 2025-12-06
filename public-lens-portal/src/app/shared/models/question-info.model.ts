import { AnswerInfo } from './answer-info.model';

export interface QuestionInfo {
  questionId: string;
  text: string;
  type: string;
  answers: AnswerInfo[];
}
