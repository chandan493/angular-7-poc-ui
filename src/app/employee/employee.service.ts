import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getEmployees(){ 
       return this.httpClient.get(this.SERVER_URL + 'employees');
  }
}
