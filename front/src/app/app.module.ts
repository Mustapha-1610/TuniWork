import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FreelancerModule } from './views/freelancer/freelancer.module';
import 'firebase/compat/storage';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { WithCredentialsInterceptor } from 'src/with-credentials.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


//aziz
import { PublicJobCreateComponent } from './views/comapny/public-job-create/public-job-create.component';
import { PublicJobEditFormComponent } from './views/comapny/public-job-edit/public-job-edit.component';
import { ComapnyModule } from './views/comapny/comapny.module';
import { HomePageModule } from './views/home-page/home-page.module';
import { CustomerModule } from './views/Customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    PublicJobCreateComponent,
    PublicJobEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    FreelancerModule,
    NgMultiSelectDropDownModule,
    HomePageModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage(getApp())),
    BrowserAnimationsModule,
    SocialLoginModule,
    ComapnyModule,
    CustomerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
