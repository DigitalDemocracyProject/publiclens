import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrosstabResult } from './survey-analysis.model'; // Import the interface

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  // This is the URL of your Python API
  private apiUrl = 'http://localhost:8000/api/v1/survey-analyzer/analyze';

  constructor(private http: HttpClient) { }

  getAnalysisResults(): Observable<CrosstabResult[]> {
    return this.http.get<CrosstabResult[]>(this.apiUrl);
  }
}
