import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

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
}
