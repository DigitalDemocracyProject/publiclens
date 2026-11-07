import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyInfo } from '../../../../shared/models/survey-info.model';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-surveys-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './surveys-list.component.html',
  styleUrl: './surveys-list.component.css'
})
export class SurveysListComponent implements OnInit {
  surveys: SurveyInfo[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.formDataService.getSurveys().subscribe({
      next: (surveys) => {
        this.surveys = surveys;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        console.error('Error loading surveys:', error);
        this.errorMessage = 'Unable to load surveys. Please try again.';
        this.isLoading = false;
      }
    });
  }
}