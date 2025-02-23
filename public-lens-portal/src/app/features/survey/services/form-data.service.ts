import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    // Existing mock form data
    const formJson = {
      title: 'Survey Form',
      questions: [
        {
          id: 'q1',
          text: 'What is your favorite color?',
          type: 'radio',
          options: ['Red', 'Blue', 'Green']
        },
        {
          id: 'q2',
          text: 'Select your hobbies',
          type: 'checkbox',
          options: ['Reading', 'Traveling', 'Gaming']
        },
        {
          id: 'q3',
          text: 'Where are you from?',
          type: 'dropdown',
          options: ['USA', 'UK', 'India']
        },
        { id: 'q4', text: 'Any additional comments?', type: 'text' }
      ]
    };
    return new Observable((observer) => {
      observer.next(formJson);
      observer.complete();
    });
  }
}
