import { Observable } from 'rxjs';
import { IEmployee } from './employee';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  getEmployees():Observable<IEmployee[]>{
    return this._http.get<IEmployee[]>("http://demo1812111.mockable.io/employees");
  }
}
