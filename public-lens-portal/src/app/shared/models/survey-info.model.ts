import { QuestionInfo } from './question-info.model';

export interface SurveyInfo {
  id: string;
  surveyName: string;
  description: string;
  demographics: QuestionInfo[];
  questions: QuestionInfo[];
}
