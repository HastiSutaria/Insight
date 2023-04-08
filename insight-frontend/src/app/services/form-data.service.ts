import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  // private base_url = 'http://localhost:3000/';
  subject = new Subject();
  formByKey= new Subject();
  ApiErrors = new Subject();

  

  constructor(private http: HttpClient, private _router: Router) {}

  saveFormData(formData: any) {
    const create_form_url = 'http://localhost:3000/create/survey';
    // console.log('in save form data', create_form_url);
    return this.http.post<any>(create_form_url, formData, {observe: 'body'});

  }

    getSurveys(){
        this.http.get('http://localhost:3000/surveys').pipe(map(response=>response
        )).subscribe((forms)=>{
          // console.log(forms)
            this.subject.next(forms);
            return forms;
            
        },(error)=>{
            this.ApiErrors.next(error);
        })
    }
    getSurveyByKey(key:string){
        this.http.get(`http://localhost:3000/survey/${key}`).subscribe((data)=>{
            this.formByKey.next(data);
        },(error)=>this.ApiErrors.next(error));
    }

    deleteSurvey(key: string): Observable<unknown> {
        return this.http.delete<any>(`http://localhost:3000/survey/${key}`).pipe()
    }

    SubmitResponse(body:any){
        this.http.post('http://localhost:3000/survey/response',body).subscribe((response)=>{
            // console.log(response);
        },(error)=>this.ApiErrors.next(error))
    }
}
