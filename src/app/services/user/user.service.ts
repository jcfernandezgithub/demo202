import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = "https://studio-app.herokuapp.com";

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get(`${this.endpoint}/api/user/list`, { headers: { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJkZjc0YWM0ZDAxODE2NDU1MjQxMGQiLCJleHBpcmUiOiIyMDE5LTExLTE5VDE3OjA3OjMxLjk5NFoiLCJpYXQiOjE1NzM1Nzg0NTF9.6FUIndZdXjxwBfhCFBa32Rxegl-X5K4qBAY2AS395Ys" } });
  }
}
