import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = "https://studio-app.herokuapp.com";

  constructor(private http: HttpClient) { }

  public singin(form) {
    return this.http.post(`${this.endpoint}/api/auth/signin`, form);
  }
}
