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

  employeeForm:FormGroup;
  //userInfo = new User();
  employeeInfo: Employee[];

  employeeInfo$: Observable<Employee[]>;
  addUser:boolean = false;
  closeResult: string;
  addEmployeePopup:boolean = false;
  filter = new FormControl('');
  constructor(private formBuilder: FormBuilder, private empService:EmployeeService, private pipe: DecimalPipe) {

    this.employeeInfo$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );

   }


  ngOnInit() {

    this.empService.getEmployees().subscribe(
     (data) => {
       console.log(data),
       this.showUser(data)},
     error => console.log(error) 
    );
    this.initializeForm();

  }

  initializeForm(){
    this.employeeForm = this.formBuilder.group({
      empName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      organization: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      role: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      })
  }

  search(text: string): Employee[] {
    return this.employeeInfo.filter(employee => {
      const term = text.toLowerCase();
      return employee.empName.toLowerCase().includes(term);
    });
  }

  showUser(data){
    this.employeeInfo = data;
  }

  showAddUser(){
    this.addUser = true;
  }

  
  open() {
    this.initializeForm();
    this.addEmployeePopup = true;
  }

  closePopup(){
    this.addEmployeePopup = false;
  }

  onSubmit(data:Employee){
    this.empService.addEmployee(data as Employee)
      .subscribe(emp => {
        this.employeeInfo.push(emp);
        this.addEmployeePopup = false;
      });
  }

  updateEmployee(){
    console.log("helll");
  }

  deleteEmployee(){
    console.log("helll");
  }
}
