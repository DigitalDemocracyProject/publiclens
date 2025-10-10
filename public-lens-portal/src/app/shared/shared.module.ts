import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: []
})
export class SharedModule { }

// Export models
export type { AnswerInfo } from './models/answer-info.model';
export type { QuestionInfo } from './models/question-info.model';
export type { DemographicInfo } from './models/demographic-info.model';
export type { SurveyInfo } from './models/survey-info.model';
export type { UserResponseInfo } from './models/user-response-info.model';

// Export enums
export { AnswerType } from './enums/answer-type.enum';
