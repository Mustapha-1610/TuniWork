import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerlayoutComponent } from 'src/app/layout/freelancerlayout/freelancerlayout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { CheckWorkOfferDetailsComponent } from './check-work-offer-details/check-work-offer-details.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';
import { PassResetPageComponent } from './pass-reset-page/pass-reset-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'browse', component: FindWorkPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'WorkOffer/:id', component: CheckWorkOfferDetailsComponent },
  { path: 'browse', component: FindWorkPageComponent },
  { path: 'editInfos', component: EditInfosPageComponent },
  { path: 'editPassword', component: PassResetPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}
