import { EmployeeService } from './../employee.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../employee';

@Component({
  selector: 'app-nested-forms',
  templateUrl: './nested-forms.component.html',
  styleUrls: ['./nested-forms.component.css']
})
export class NestedFormsComponent implements OnInit {

  myForm:FormGroup;
  public employees:IEmployee[]=[];

  constructor(private fb:FormBuilder, private _employeeService:EmployeeService) { }

  ngOnInit() {

   this._employeeService.getEmployees().subscribe(data =>this.employees=data);
   
   console.log(this.employees);
   const phone=this.fb.group({
      area:[],
      prefix:[],
      line:[]
    })
    this.myForm=this.fb.group({
      email:'',
      homePhone: phone,
      cellPhone:phone
    })
  }

}
