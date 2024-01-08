import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivateJobDetailsComponent } from './private-job-details/private-job-details.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { TalentFreelancersComponent } from './talent-freelancers/talent-freelancers.component';
import { TalentFreelancerProfileComponent } from './talent-freelancer-profile/talent-freelancer-profile.component';
import { TalentSavedFreelancersComponent } from './talent-saved-freelancers/talent-saved-freelancers.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ChatComponent } from './chat/chat.component';
import { FreelancerListComponent } from './freelancer-list/freelancer-list.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    HomePageComponent,
    MyJobsComponent,
    TalentFreelancersComponent,
    TalentFreelancerProfileComponent,
    TalentSavedFreelancersComponent,
    PrivateJobCreateComponent,
    PrivateJobDetailsComponent,
    PrivateJobEditComponent,
    DeleteConfirmationComponent,
    ChatComponent,
    FreelancerListComponent,
    ContactComponent,
   
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressBarModule, 
    MatIconModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class CustomerModule { }
