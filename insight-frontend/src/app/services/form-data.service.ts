import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private base_url = 'http://localhost:3000';
  subject = new Subject();
  formByKey = new Subject();
  ApiErrors = new Subject();

  constructor(private http: HttpClient, private _router: Router) {}

  saveFormData(formData: any) {
    const create_form_url = `${this.base_url}/create/survey`;
    // console.log('in save form data', create_form_url);
    return this.http.post<any>(create_form_url, formData, { observe: 'body' });
  }

  getSurveys() {
    this.http
      .get(`${this.base_url}/surveys`)
      .pipe(map((response) => response))
      .subscribe(
        (forms) => {
          // console.log(forms)
          this.subject.next(forms);
          return forms;
        },
        (error) => {
          this.ApiErrors.next(error);
        }
      );
  }

  getSurveyByKey(key: string) {
    this.http.get(`${this.base_url}/survey/${key}`).subscribe(
      (data) => {
        this.formByKey.next(data);
      },
      (error) => this.ApiErrors.next(error)
    );
  }

  deleteSurvey(key: string): Observable<unknown> {
    return this.http.delete<any>(`${this.base_url}/survey/${key}`).pipe();
  }

  SubmitResponse(body: any) {
    this.http.post(`${this.base_url}/survey/response`, body).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => this.ApiErrors.next(error)
    );
  }

  editQuestionById(id: number, label: string) {
    console.log(id, label);
    this.http
      .post<any>(`${this.base_url}/survey/editQuestion/${id}`, { label }, {
        observe: 'body',
      })
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => this.ApiErrors.next(error)
      );
  }
}
