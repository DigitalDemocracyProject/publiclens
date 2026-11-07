import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, distinctUntilChanged, filter, map, of, startWith, Subject, switchMap } from 'rxjs';
import { SurveyService } from '../survey.service';
import { CrosstabResult } from '../survey-analysis.model';

@Component({
  selector: 'app-analysis-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './analysis-viewer.component.html',
  styleUrl: './analysis-viewer.component.css'
})
export class AnalysisViewerComponent implements OnInit {
  results: CrosstabResult[] = [];
  isLoading = true;
  errorMessage = '';

  private readonly refresh$ = new Subject<void>();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => params.get('surveyId')),
      filter((surveyId): surveyId is string => surveyId !== null),
      distinctUntilChanged(),
      switchMap((surveyId) => this.refresh$.pipe(
        startWith(undefined),
        switchMap(() => {
          this.isLoading = true;
          this.errorMessage = '';
          this.results = [];

          return this.surveyService.getAnalysisResults(surveyId).pipe(
            map((results) => ({ results })),
            catchError((error: unknown) => {
              console.error('Error loading survey analysis:', error);
              return of({ error: true as const });
            })
          );
        })
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((response) => {
      this.isLoading = false;

      if ('error' in response) {
        this.errorMessage = 'Unable to load this survey’s analysis. Please try again.';
        return;
      }

      this.results = response.results;
    });
  }

  retry(): void {
    this.refresh$.next();
  }
}
