import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PublicJobCreateComponent } from '../comapny/public-job-create/public-job-create.component';
import { PublicJobEditFormComponent } from '../comapny/public-job-edit/public-job-edit.component';
import { PublicJobDetailsComponent } from '../comapny/public-job-details/public-job-details.component';
import { TalentFreelancersComponent } from '../comapny/talent-freelancers/talent-freelancers.component';
import { TalentFreelancerProfileComponent } from '../comapny/talent-freelancer-profile/talent-freelancer-profile.component';
import { TalentSavedFreelancersComponent } from '../comapny/talent-saved-freelancers/talent-saved-freelancers.component';
import { PrivateJobDetailsComponent } from '../comapny/private-job-details/private-job-details.component';

const routes: Routes = [
  {
    path: '',
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
  {
    path: 'freelancers',
    component: TalentFreelancersComponent,
  },
  {
    path: 'talent-freelancer-profile/:freelancerId',
    component: TalentFreelancerProfileComponent,
  },
  {
    path: 'saved-freelancers',
    component: TalentSavedFreelancersComponent,
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
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
