import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  getFormData(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/survey/68e14b2cc5cf813189b25c86`);
  }
}
