import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  @Output() updateEmployeeListEvent = new EventEmitter();
  isEdit: boolean = false;
  deletePopup:boolean=false;
  employeeForm: FormGroup;
  addEmployeePopup: boolean = false;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeService) { }

  ngOnInit() {
    this.isEdit=false;
    this.initializeForm();
  }

  initializeForm() {
    this.employeeForm = this.formBuilder.group({
      empID: new FormControl(),
      empName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z ]*$/)])),
      organization: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z ]*$/)])),
      role: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z ]*$/)])),
      project: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z ]*$/)])),
    })
  }
  open() {
    this.initializeForm();
    this.addEmployeePopup = true;
    this.isEdit = false;
  }

  onSubmit(data: Employee) {
    if (this.isEdit == false) {
      this.empService.addEmployee(data as Employee)
        .subscribe(emp => {
          //this.employeeInfo.push(emp);
          this.addEmployeePopup = false;
          this.updateEmployeeList();
        });
    }
    else {
      this.empService.updateEmployeebyId(data as Employee)
        .subscribe(emp => {
          //this.loadEmployees();
          this.addEmployeePopup = false;
          this.updateEmployeeList();
        });
    }
  }

  updateEmployeeList() {
    this.updateEmployeeListEvent.emit(null);
  }

  update(data: Employee) {
    this.isEdit=true;
    this.addEmployeePopup = true;
    this.editEmp(data as Employee, data.empID);
  }

  editEmp(emp: Employee, empID) {
    this.employeeForm.setValue({
      empID: empID,
      empName: emp.empName,
      organization: emp.organization,
      role: emp.role,
      project: emp.project,
      location: emp.location
    })
  }
}
