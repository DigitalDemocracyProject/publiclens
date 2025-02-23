import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SurveyModule } from './survey/survey.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    SurveyModule
  ]
})
export class FeaturesModule { }
