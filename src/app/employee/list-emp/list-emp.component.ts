import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

  @Output() updateEmployeeEvent = new EventEmitter();
  searchText:string;
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

  filterSearch(data){
    this.searchText = data;
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
