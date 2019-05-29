import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeComponent } from './employee/employee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EmployeeService } from './employee/employee.service';
import {DialogModule} from 'primeng/dialog';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ListEmpComponent } from './employee/list-emp/list-emp.component';
import { AddEmpComponent } from './employee/add-emp/add-emp.component';
import { SearchEmpComponent } from './employee/search-emp/search-emp.component';

import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    AboutUsComponent,
    EmployeeComponent,
    ContactUsComponent,
    ListEmpComponent,
    AddEmpComponent,
    LoginComponent,
    SearchEmpComponent
  ],
  imports: [
    BrowserModule,
    OrderModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DialogModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
