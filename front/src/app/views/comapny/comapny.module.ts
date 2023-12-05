// company.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { ProfilePageEditComponent } from './profile-page-edit/profile-page-edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatIconModule } from '@angular/material/icon';

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
    ProfilePageEditComponent,
  ],
  imports: [
    CommonModule,
    ComapnyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatIconModule,
  ],
})
export class ComapnyModule {}
