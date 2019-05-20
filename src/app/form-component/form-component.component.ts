import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  myForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.myForm=this.fb.group({
      'email':'',
      'message':'',
      'career':''
    })
    this.myForm.valueChanges.subscribe(console.log);
  }

}
