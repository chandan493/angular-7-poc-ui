import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../login/User';
import { UserService } from '../login/user.service';
//newly added
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupPopup: boolean = false;
  signupForm: FormGroup;
  signupStatus: string = '';
  responsePopup: boolean = false;
  hideSignUp: boolean = true;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.formBuilder.group({
      userEmail: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])),
      firstName: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z ]*$/)])),
      lastName: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z ]*$/)])),
      contactNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}/)])),
      location: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^[a-zA-Z ]*$/)])),
      password: new FormControl('', Validators.compose([Validators.required,  Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$/)])),
    });
  }
  SignupPopup() {
    console.log('working');
    this.signupPopup = true;
  }

  onSubmit(data: User) {
    console.log(data);
    this.userService.signupUser(data).subscribe(
      (response) => {
        this.signupPopup = !this.signupPopup;
        this.responsePopup = true;
        if (response["response"] == 'success') {
          this.signupStatus = "Registration Successful"
          
          this.hideSignUp = false;
        } else {
          this.signupStatus = "Registration Failed " + response["response"];
          this.hideSignUp = false;
        }
      }
    );
  }

}
