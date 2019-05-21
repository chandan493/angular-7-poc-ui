import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let employees = [
      { empId: 1001, name: "Chandan Ghosh", org: "Deloitte", role: "Developer", project: "HCSC", location: "Bangalore" },
      { empId: 1002, name: "Suyash Upadhyay", org: "Deloitte", role: "Developer", project: "HCSC", location: "Bangalore" },
      { empId: 1003, name: "Manjunath", org: "Deloitte", role: "Developer", project: "HCSC", location: "Bangalore" }
    ];
    return { employees };

  }
}
