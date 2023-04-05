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
    // this.http.post('http://localhost:3000/create/form', this.FinalBody, { observe: 'body' }).subscribe((response: any) => {
    //     let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
    //       data: {
    //         url: window.location.origin+`/forms/${response.slug}/view/form`
            
    //       },
    //       height: '400px',
    //       width: '600px',
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       this.route.navigate(['/']);
    //     });
    //   }, (error) => {
    //     this.snackbar.open(error.message, "Dismiss", {
    //       duration: 2000
    //     })
    //   })
  }
}
