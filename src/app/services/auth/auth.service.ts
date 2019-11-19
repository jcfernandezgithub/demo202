import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = "https://studio-app.herokuapp.com";

  constructor(
    private http: HttpClient
  ) { }

  public signin(form) {
    return this.http.post(`${this.endpoint}/api/auth/signin`, form);
  }

  public reset(form) {
    return this.http.post(`${this.endpoint}/api/auth/forgot`, form);
  }

  public check(email) {
    return this.http.post(`${this.endpoint}/api/auth/check`, email);
  }

  public signout() {
    return sessionStorage.removeItem('session');
  }

  public loggedIn(): boolean {

    const session = sessionStorage.getItem('session');

    if(!session) {
      return false;
    }

    return true;
  }

  public token() {
    const session = JSON.parse(sessionStorage.getItem('session'));

    return session.token;
  }
}
