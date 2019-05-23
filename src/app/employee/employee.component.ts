import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DecimalPipe]
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  isEdit:boolean=false;
  //userInfo = new User();
  employeeInfo: Employee[] = [];

  employeeInfo$: Observable<Employee[]>;
  addUser: boolean = false;
  closeResult: string;
  addEmployeePopup: boolean = false;
  filter = new FormControl('');
  deletePopup: boolean = false;
  empID: number;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private pipe: DecimalPipe) {

    this.employeeInfo$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );

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
  ngOnInit() {
    this.loadEmployees();
    this.initializeForm();


  }

  initializeForm() {
    this.employeeForm = this.formBuilder.group({
      empID: new FormControl(),
      empName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z][a-z]/)])),
      organization: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z][a-z]/)])),
      role: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z][a-z]/)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z][a-z]/)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z][a-z]/)])),
    })
  }

  search(text: string): Employee[] {
    return this.employeeInfo.filter(employee => {
      const term = text.toLowerCase();
      return employee.empName.toLowerCase().includes(term);
    });
  }

  showUser(data) {
    this.employeeInfo = data;
  }

  showAddUser() {
    this.addUser = true;
  }


  open() {
    this.initializeForm();
    this.addEmployeePopup = true;
    this.isEdit = false;
  }

  closePopup() {
    this.addEmployeePopup = false;
  }

  onSubmit(data: Employee) {
    if(this.isEdit == false){
    this.empService.addEmployee(data as Employee)
      .subscribe(emp => {
        this.employeeInfo.push(emp);
        this.addEmployeePopup = false;
      });
  }
  else{
    this.empService.updateEmployeebyId(data as Employee)
      .subscribe(emp => {
        this.loadEmployees();
        this.addEmployeePopup = false;
      });
  }
}
//Added by srijan
  editEmployeeDetails(empID:number){
    this.isEdit=true;
    this.addEmployeePopup = true;
    
    this.empService.getEmployeebyId(empID).subscribe(
      (data) => {
        console.log(data);
        this.editEmp(data as Employee, empID);
        this.addEmployeePopup = true;
        //this.initializeForm();
      },
      error => console.log(error)
    );
  }
  updateEmployeeDetails(employee:Employee) {
    console.log("new commit");
  }

editEmp(emp:Employee, empID){
 this.employeeForm.setValue({
  empID: empID,
  empName: emp.empName,
  organization: emp.organization,
  role: emp.role,
  project: emp.project,
  location: emp.location
})
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

}
