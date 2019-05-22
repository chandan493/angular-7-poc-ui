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
  API_SERVER: string = "http://10.31.90.46";
  SERVER_URL: string = this.API_SERVER+":8080/";
  constructor(private httpClient: HttpClient) { }

  public getEmployees(){ 
       return this.httpClient.get(this.SERVER_URL + 'employees');
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.SERVER_URL+'addEmployee', employee, httpOptions).pipe(
      tap((newEmp: Employee) => this.log(`Added Employee w/ id=${newEmp.empID}`)),
      catchError(this.handleError<Employee>('AddEmployee'))
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
