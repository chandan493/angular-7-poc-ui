import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "./employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _employeeService: EmployeeService) {

  }

  title = 'angular-ui-poc';

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((data: any[]) => {
      console.log(data);
    })
  }
}
