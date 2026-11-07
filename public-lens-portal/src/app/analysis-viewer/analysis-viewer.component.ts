// analysis-viewer.component.ts

import { Component, OnInit, Signal } from '@angular/core'; // Import Signal
import { toSignal } from '@angular/core/rxjs-interop'; // Import toSignal
import { SurveyService } from './../survey.service';
import { CrosstabResult } from './../survey-analysis.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis-viewer',
  templateUrl: './analysis-viewer.component.html',
  styleUrls: ['./analysis-viewer.component.css'],
  // Make sure your component is standalone: true to use the new syntax
  // or that the necessary imports are in your NgModule.
  // For standalone:
  // standalone: true,
  // imports: [CommonModule] // CommonModule is no longer needed for control flow!
})
export class AnalysisViewerComponent implements OnInit {

  // Convert the observable to a signal.
  // We give it an initialValue of [] so the type is CrosstabResult[]
  // and we don't have to check for 'undefined'.
  public results: Signal<CrosstabResult[]>;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute) {
    // It's often better to initialize signals in the constructor
    this.results = toSignal(
      this.surveyService.getAnalysisResults(this.route.snapshot.paramMap.get('surveyId')!),
      { initialValue: [] }
    );
  }

  ngOnInit(): void {
    // The logic is now in the constructor, so ngOnInit might be empty
    // or used for other purposes.
  }
}
