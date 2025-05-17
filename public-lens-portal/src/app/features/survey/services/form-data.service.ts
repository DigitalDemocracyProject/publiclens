import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private API_URL = 'http://localhost:8083/api/responses';

  constructor(private http: HttpClient) {}

  submitResponses(responsePayload: any): Observable<any> {
    return this.http.post<any>(this.API_URL, responsePayload);
  }

  getFormData(): Observable<any> {
    return this.http.get<any[]>('assets/questions.json').pipe(
      map((questions: any) => ({
        title: 'Survey Form',
        questions: questions
      }))
    );
  }
}
