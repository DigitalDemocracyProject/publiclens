import { QuestionInfo } from './question-info.model';

export interface UserResponseInfo {
  surveyId: string;
  userId: string;
  demographics: QuestionInfo[];
  userAnswers: QuestionInfo[];
}
