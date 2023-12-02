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
    OngoingWorkComponent,
    FinichedWorkComponent,
    ApplyedJobsComponentComponent,
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
    NgMultiSelectDropDownModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class FreelancerModule {}
