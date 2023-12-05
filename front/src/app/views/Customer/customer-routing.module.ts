import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivateJobCreateComponent } from './private-job-create/private-job-create.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PrivateJobEditComponent } from './private-job-edit/private-job-edit.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';

const routes: Routes = [

  {path: '',component: HomePageComponent,},
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  

  {
    path: 'private-job-create/:freelancerId',

    component: PrivateJobCreateComponent,
  },
  {
    path: 'private-job-edit/:privateJobOfferId',
    component: PrivateJobEditComponent,
  },
  {
    path: 'my-jobs',
    component: MyJobsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
