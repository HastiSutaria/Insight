import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _registerUrl = 'http://localhost:3000/register';
  private _loginUrl = 'http://localhost:3000/login';
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {

    return this.http.post<any>(this._loginUrl, user);
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
}
