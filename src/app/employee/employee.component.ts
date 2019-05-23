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
  empId: number;
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
      empName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      organization: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      role: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    })
  }

  initializeFormForUpdate(employee:Employee){
    console.info(employee);
    this.employeeForm = this.formBuilder.group({
      empId:new FormControl(employee.empID),
      empName: new FormControl(employee.empName, Validators.compose([Validators.required, Validators.minLength(6)])),
      organization: new FormControl(employee.organization, Validators.compose([Validators.required, Validators.minLength(6)])),
      role: new FormControl(employee.role, Validators.compose([Validators.required, Validators.minLength(6)])),
      project: new FormControl(employee.project, Validators.compose([Validators.required, Validators.minLength(6)])),
      location: new FormControl(employee.location, Validators.compose([Validators.required, Validators.minLength(6)])),
      })
      console.log(employee.empName)
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
  }

  closePopup() {
    this.addEmployeePopup = false;
  }

  onSubmit(data: Employee) {
    this.isEdit=false;
    this.empService.addEmployee(data as Employee)
      .subscribe(emp => {
        this.employeeInfo.push(emp);
        this.addEmployeePopup = false;
      });
  }
//Added by srijan
  editEmployeeDetails(empId:number){
    console.log("helll");
    this.isEdit=true;
    this.addEmployeePopup = true;
    
    this.empService.getEmployeebyId(empId).subscribe((data) => {
      this.initializeFormForUpdate(<Employee>data);


    })
  }
  updateEmployeeDetails(employee:Employee) {
    console.log("new commit");
  }

initDeletePopup(empId: number) {
  this.empId = empId;
  this.deletePopup = true;
}

  deleteEmployee() {
    if (this.deletePopup) {
      this.empService.deleteEmployee(this.empId).subscribe((data) => this.loadEmployees());
      this.deletePopup = !this.deletePopup;
    }
  }

}
