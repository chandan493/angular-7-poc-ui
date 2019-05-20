import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from "angular-in-memory-web-api";  
import { DataService } from  "./data.service";
import {HttpClientModule} from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeComponent } from './employee/employee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EmployeeService } from './employee/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashboardComponent,
    AboutUsComponent,
    EmployeeComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    InMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
