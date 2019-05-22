import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let employees = [
      { empId: 1001, name: "Chandan Ghosh", org: "Deloitte", role: "Developer", project: "HCSC", location: "Bangalore" }
    ];
    return { employees };

  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.empId)) + 1 : 1001;
  }
}
