import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerlayoutComponent } from 'src/app/layout/freelancerlayout/freelancerlayout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [{ path: '', component: ProfilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}
