import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';




@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm:FormGroup;
  //userInfo = new User();
  employeeInfo: Employee[];
  constructor(private formBuilder: FormBuilder, private empService:EmployeeService) { }

  ngOnInit() {

    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(8)])),
      org: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(8)])),
      role: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(8)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(8)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(8)])),
      })

    this.empService.getEmployees().subscribe(
     data => {
       console.log(data),
       this.showUser(data)},
     error => console.log(error) 
    );

  }

  showUser(data){
    this.employeeInfo = data;
  }
}
