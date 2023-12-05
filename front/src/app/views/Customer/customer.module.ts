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

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // Add this import
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfilePageComponent,
    MyJobsComponent,
    HomePageComponent,
    PrivateJobCreateComponent,
    PrivateJobDetailsComponent,
    PrivateJobEditComponent,
   
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatProgressBarModule, 
    MatIconModule,
  ]
})
export class CustomerModule { }
