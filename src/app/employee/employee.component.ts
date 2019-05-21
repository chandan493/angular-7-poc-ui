import { Component, OnInit, PipeTransform  } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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

  filter = new FormControl('');

  constructor(private formBuilder: FormBuilder, private empService:EmployeeService, pipe: DecimalPipe) {
    this.employeeInfo$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
   }

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

  search(text: string): Employee[] {
    return this.employeeInfo.filter(employee => {
      const term = text.toLowerCase();
      return employee.name.toLowerCase().includes(term);
    });
  }
  
  showUser(data){
    this.employeeInfo = data;
  }
}
