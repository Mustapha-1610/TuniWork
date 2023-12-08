import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { CheckWorkOfferDetailsComponent } from './check-work-offer-details/check-work-offer-details.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { WorkInfosComponent } from './history-page/work-infos/work-infos.component';
import { SubmitPaymentRequestPageComponent } from './submit-payment-request-page/submit-payment-request-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { PwoInfosComponent } from './inbox/recieved-work-offers/pwo-infos/pwo-infos.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'browse', component: FindWorkPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'WorkOffer/:id', component: CheckWorkOfferDetailsComponent },
  { path: 'browse', component: FindWorkPageComponent },
  { path: 'editInfos', component: EditInfosPageComponent },
  { path: 'workHistory', component: HistoryPageComponent },
  { path: 'WPDisplay/:id', component: WorkInfosComponent },
  {
    path: 'submitPaymentRequest/:id',
    component: SubmitPaymentRequestPageComponent,
  },
  {
    path: 'MyInbox',
    component: InboxComponent,
  },
  {
    path: 'checkPWOInfos/:id',
    component: PwoInfosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}
