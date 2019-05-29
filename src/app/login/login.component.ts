import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPopup: boolean = false;
  loginForm: FormGroup;
  loginStatus: string = '';
  responsePopup: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userEmail: new FormControl(),
      password: new FormControl()
    });
  }

  initLoginPopup() {
    this.loginPopup = true;
  }

  onSubmit(data: User) {
    console.log(data);
    this.userService.loginUser(data).subscribe(
      (response) => {
        this.loginPopup = !this.loginPopup;
        this.loginStatus = response['response'];
        this.responsePopup = true;
        console.log(response);
      }
    );
  }
  
}
