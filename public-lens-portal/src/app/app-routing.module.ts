import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/components/home/home.component';
import { SurveyFormComponent } from './features/survey/components/survey-form/survey-form.component';
import { SuccessComponent } from './features/survey/components/success/success.component';
import { ResultComponent } from './features/result/components/result/result.component';
import { SummaryComponent } from './features/result/components/summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'surveys', component: SurveyFormComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'result', component: ResultComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
