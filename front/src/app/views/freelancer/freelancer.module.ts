import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';
import { BestMatchesComponentComponent } from './best-matches-component/best-matches-component.component';
import { SavedJobsComponentComponent } from './saved-jobs-component/saved-jobs-component.component';
import { CheckWorkOfferDetailsComponent } from './check-work-offer-details/check-work-offer-details.component';
import { ApplyedJobsComponentComponent } from './applyed-jobs-component/applyed-jobs-component.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OngoingWorkComponentComponent } from './history-page/ongoing-work-component/ongoing-work-component.component';
import { FinichedWorkComponentComponent } from './history-page/finiched-work-component/finiched-work-component.component';
import { WorkInfosComponent } from './history-page/work-infos/work-infos.component';
import { SubmitPaymentRequestPageComponent } from './submit-payment-request-page/submit-payment-request-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { RecievedContractsComponent } from './inbox/recieved-contracts/recieved-contracts.component';
import { RecievedWorkOffersComponent } from './inbox/recieved-work-offers/recieved-work-offers.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PwoInfosComponent } from './inbox/recieved-work-offers/pwo-infos/pwo-infos.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent,
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
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    FreelancerRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage(getApp())),
    ReactiveFormsModule,
    MatProgressBarModule,
    PdfViewerModule,
    NgMultiSelectDropDownModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class FreelancerModule {}
