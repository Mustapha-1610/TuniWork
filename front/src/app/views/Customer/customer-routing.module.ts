import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import {TalentFreelancersComponent} from './talent-freelancers/talent-freelancers.component'
import {TalentFreelancerProfileComponent} from './talent-freelancer-profile/talent-freelancer-profile.component'
import {PrivateJobDetailsComponent} from './private-job-details/private-job-details.component'
import {TalentSavedFreelancersComponent} from './talent-saved-freelancers/talent-saved-freelancers.component'
import { ChatComponent } from './chat/chat.component';

import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'homeC',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'my-jobs',
    component: MyJobsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
/*
  {
    path: 'public-job-create',
    component: PublicJobCreateComponent,
  },

  {
    path: 'edit-job/:jobOfferId',
    component: PublicJobEditFormComponent,
  },
  {
    path: 'public-job-details/:publicJobOfferId',
    component: PublicJobDetailsComponent,
  },
   */
  {
    path: 'saved-freelancers',
    component: TalentSavedFreelancersComponent,
  },
  {
    path: 'freelancers',
    component: TalentFreelancersComponent,
  },
  {

    path: 'talent-freelancer-profile/:freelancerId',
    component: TalentFreelancerProfileComponent,
  },

  {
    path: 'private-job-create/:freelancerId',

    component: PrivateJobCreateComponent,
  },
  {
    path: 'private-job-details/:privateJobOfferId',
    component: PrivateJobDetailsComponent,
  },
  {
    path: 'private-job-edit/:privateJobOfferId',
    component: PrivateJobEditComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
