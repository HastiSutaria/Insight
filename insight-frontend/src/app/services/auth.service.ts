import { Injectable } from '@angular/core';

import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = 'http://localhost:3000/register';
  private _loginUrl = 'http://localhost:3000/login';
  private _profileUrl = 'http://localhost:3000/profile';
  private _editprofileUrl = 'http://localhost:3000/editProfile';
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private _router: Router, private sanitizer: DomSanitizer) {}

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getProfile() {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    const options = { headers: headers };
    return this.http.get(this._profileUrl, options);
  }

  editProfile(body: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    return this.http.post(this._editprofileUrl, body, {
      observe: 'body',
      headers
    });
  }

  getProfilePicture(): Observable<SafeUrl>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'blob' // Set the responseType to 'blob' to receive a binary file
    }).set('Authorization', 'Bearer ' + this.getToken());
   return this.http.get('http://localhost:3000/profilePicture', { headers: headers, responseType: 'blob' }).pipe(
    map(blob => {
      // Convert the blob to a SafeUrl
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      return safeUrl;
    })
   );

  }
  
  editProfilePicture(file: File){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getToken());
    const formData = new FormData();
    formData.append('profilePath', file);
    return this.http.post('http://localhost:3000/profilePictureEdit', formData, {
      observe: 'body', headers
    })
  }

}
