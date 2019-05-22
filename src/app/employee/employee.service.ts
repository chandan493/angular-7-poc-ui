import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from './employee';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getEmployees(){ 
       return this.httpClient.get(this.SERVER_URL + 'employees');
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.SERVER_URL+'employees', employee, httpOptions).pipe(
      tap((newEmp: Employee) => this.log(`added hero w/ id=${newEmp.empId}`)),
      catchError(this.handleError<Employee>('addHero'))
    );
  }

  private log(message: string) {
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
