import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PublicJobCreateComponent } from './public-job-create/public-job-create.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { PublicJobEditFormComponent } from './public-job-edit/public-job-edit.component';
import { PublicJobDetailsComponent } from './public-job-details/public-job-details.component';
import { TalentFreelancersComponent } from './talent-freelancers/talent-freelancers.component';
import { TalentFreelancerProfileComponent } from './talent-freelancer-profile/talent-freelancer-profile.component';
import { TalentSavedFreelancersComponent } from './talent-saved-freelancers/talent-saved-freelancers.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { PrivateJobDetailsComponent } from './private-job-details/private-job-details.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { ProfilePageEditComponent } from './profile-page-edit/profile-page-edit.component';
import { ProfilePageSecurityComponent } from './profile-page-security/profile-page-security.component';

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
  path:'freelancers',
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
{
  path:'security',
  component: ProfilePageSecurityComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],

  exports: [RouterModule],
})
export class ComapnyRoutingModule {}
