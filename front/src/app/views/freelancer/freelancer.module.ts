import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyWorkPageComponent } from './my-work-page/my-work-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';
import { BestMatchesComponentComponent } from './best-matches-component/best-matches-component.component';
import { SavedJobsComponentComponent } from './saved-jobs-component/saved-jobs-component.component';
import { CheckWorkOfferDetailsComponent } from './check-work-offer-details/check-work-offer-details.component';
import { OngoingWorkComponent } from './my-work-page/ongoing-work/ongoing-work.component';
import { FinichedWorkComponent } from './my-work-page/finiched-work/finiched-work.component';
import { PassResetPageComponent } from './pass-reset-page/pass-reset-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent,
    MyWorkPageComponent,
    FindWorkPageComponent,
    EditInfosPageComponent,
    BestMatchesComponentComponent,
    SavedJobsComponentComponent,
    CheckWorkOfferDetailsComponent,
    ApplyedJobsComponentComponent,
    HistoryPageComponent,
    OngoingWorkComponentComponent,
    FinichedWorkComponentComponent,
    WorkInfosComponent,
    SubmitPaymentRequestPageComponent,
    InboxComponent,
    RecievedContractsComponent,
    RecievedWorkOffersComponent,
    PwoInfosComponent,
    NotificationsPageComponent,

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
