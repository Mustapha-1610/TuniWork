// company.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Make sure to import CommonModule

import { ComapnyRoutingModule } from './comapny-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PublicJobDetailsComponent } from './public-job-details/public-job-details.component';
import { TalentFreelancersComponent } from './talent-freelancers/talent-freelancers.component';
import { TalentFreelancerProfileComponent } from './talent-freelancer-profile/talent-freelancer-profile.component';
import { TalentSavedFreelancersComponent } from './talent-saved-freelancers/talent-saved-freelancers.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrivateJobDetailsComponent } from './private-job-details/private-job-details.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    HomePageComponent,
    MyJobsComponent,
    PublicJobDetailsComponent,
    TalentFreelancersComponent,
    TalentFreelancerProfileComponent,
    TalentSavedFreelancersComponent,
    PrivateJobCreateComponent,
    PrivateJobDetailsComponent,
    PrivateJobEditComponent,
  ],
  imports: [
    CommonModule, // Add this line to import CommonModule
    ComapnyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ComapnyModule { }
