import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { SurveyModule } from './survey/survey.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ResultComponent } from './result/components/result/result.component';
import { SummaryComponent } from './result/components/summary/summary.component';

@NgModule({
  declarations: [
    ResultComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    SurveyModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class FeaturesModule { }
