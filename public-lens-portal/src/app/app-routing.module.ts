import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { SurveyFormComponent } from './features/survey/components/survey-form/survey-form.component';
import { SurveysListComponent } from './features/survey/components/surveys-list/surveys-list.component';
import { SuccessComponent } from './features/survey/components/success/success.component';
import { ResultsListComponent } from './features/result/components/results-list/results-list.component';
import { AnalysisViewerComponent } from './analysis-viewer/analysis-viewer.component';
import { SummaryComponent } from './features/result/components/summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'surveys', component: SurveysListComponent },
  { path: 'surveys/:surveyId', component: SurveyFormComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'results', component: ResultsListComponent },
  { path: 'results/:surveyId', component: AnalysisViewerComponent },
  { path: 'result', redirectTo: '/results', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
