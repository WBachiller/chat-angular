import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

const headers = new HttpHeaders({
  'Content-type': 'applicant/json'
});


@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

      
  getMessage(data: any) {
    return this.http.post(`${environment.URL}api/v1/intents/converstion/-NGJhEo4OXCAwH3TQx7D`, data, {headers});
  }
}
