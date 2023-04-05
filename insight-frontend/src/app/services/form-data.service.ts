import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private base_url = 'http://localhost:3000/';

  constructor(private http: HttpClient, private _router: Router) {}

  saveFormData(formData: any) {
    const create_form_url = 'http://localhost:3000/create/survey';
    console.log('in save form data', create_form_url);
    return this.http.post<any>(create_form_url, formData, {observe: 'body'});

  }
}
