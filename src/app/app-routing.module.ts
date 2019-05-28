import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EmployeeComponent } from './employee/employee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [

  // App views
  { path: '', component:  DashboardComponent},
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'about-us', component:  AboutUsComponent},
  { path: 'employee', component:  EmployeeComponent},
  { path: 'contact-us', component:  ContactUsComponent},
  { path: '**', component:  DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 



}
