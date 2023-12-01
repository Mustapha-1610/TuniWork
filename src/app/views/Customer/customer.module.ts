import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivateJobDetailsComponent } from '../comapny/private-job-details/private-job-details.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProfilePageComponent,
    MyJobsComponent,
    HomePageComponent,
    MyJobsComponent,
    PrivateJobCreateComponent,
    PrivateJobDetailsComponent,
    PrivateJobEditComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CustomerModule { }
