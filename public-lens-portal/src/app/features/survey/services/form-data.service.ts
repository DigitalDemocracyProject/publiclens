import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SurveyInfo } from '../../../shared/models/survey-info.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  submitResponses(responsePayload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(
      `${this.API_URL}/user-response`,
      responsePayload,
      { headers }
    );
  }

  getSurveys(): Observable<SurveyInfo[]> {
    return this.http.get<SurveyInfo[]>(`${this.API_URL}/survey`);
  }

  getFormData(surveyId: string): Observable<any> {
    return this.http.get<any>(this.API_URL+"/survey/"+encodeURIComponent(surveyId));
  }
}
