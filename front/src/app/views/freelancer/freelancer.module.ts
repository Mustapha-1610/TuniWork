import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyWorkPageComponent } from './my-work-page/my-work-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { WorkInformationsPageComponent } from './work-informations-page/work-informations-page.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';
import { BestMatchesComponentComponent } from './best-matches-component/best-matches-component.component';
import { SavedJobsComponentComponent } from './saved-jobs-component/saved-jobs-component.component';
import { CheckWorkOfferDetailsComponent } from './check-work-offer-details/check-work-offer-details.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent,
    MyWorkPageComponent,
    FindWorkPageComponent,
    WorkInformationsPageComponent,
    EditInfosPageComponent,
    BestMatchesComponentComponent,
    SavedJobsComponentComponent,
    CheckWorkOfferDetailsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    FreelancerRoutingModule,

    ReactiveFormsModule,
  ],
})
export class FreelancerModule {}
