import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee';

@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

  @Output() updateEmployeeEvent = new EventEmitter();
  employeeInfo: Employee[] = [];
  addEmployeePopup: boolean = false;
  deletePopup: boolean = false;
  empID: number;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe(
      (data) => {
        console.log(data),
          this.showUser(data)
      },
      error => console.log(error)
    );
  }

  showUser(data) {
    this.employeeInfo = data;
  }

  editEmployeeDetails(empID: number) {
    this.addEmployeePopup = true;
this.empService.getEmployeebyId(empID).subscribe(
      (data) => {
        console.log(data);
        this.addEmployeePopup = true;
        this.updateEmployeeEvent.emit(data);
      },
      error => console.log(error)
    );
  }

  updateEmployeeDetails(employee: Employee) {
    console.log("new commit");
  }

  initDeletePopup(empID: number) {
    this.empID = empID;
    this.deletePopup = true;
  }

  deleteEmployee() {
    if (this.deletePopup) {
      this.empService.deleteEmployee(this.empID).subscribe((data) => this.loadEmployees());
      this.deletePopup = !this.deletePopup;
    }
  }
  closePopup() {
    this.addEmployeePopup = false;
  }

}
