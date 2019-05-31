import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './User';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  SERVER_URL: string = "https://angular-poc-api.cfapps.io/";

  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.SERVER_URL + 'login', user);
  }

  signupUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.SERVER_URL + 'register', user);
  }
}
