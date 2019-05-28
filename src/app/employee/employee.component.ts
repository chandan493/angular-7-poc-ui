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

  
 
  //userInfo = new User();
  
  employeeInfo$: Observable<Employee[]>;
  addUser: boolean = false;
  closeResult: string;
  
  filter = new FormControl('');
 
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private pipe: DecimalPipe) {

    // this.employeeInfo$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text))
    // );

  }


  // loadEmployees() {
  //   this.empService.getEmployees().subscribe(
  //     (data) => {
  //       console.log(data),
  //         this.showUser(data)
  //     },
  //     error => console.log(error)
  //   );
  // }
  ngOnInit() {
    //this.loadEmployees();
    


  }

  // search(text: string): Employee[] {
  //   return this.employeeInfo.filter(employee => {
  //     const term = text.toLowerCase();
  //     return employee.empName.toLowerCase().includes(term);
  //   });
  // }

  // showUser(data) {
  //   this.employeeInfo = data;
  // }

  showAddUser() {
    this.addUser = true;
  }


  

  

}
