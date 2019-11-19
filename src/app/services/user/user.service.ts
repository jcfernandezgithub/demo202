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

  public list() {
    return this.http.get(`${this.endpoint}/api/user/list`);
  }

  public remove(id) {
    return this.http.delete(`${this.endpoint}/api/user/${id}/delete`);
  }
}
