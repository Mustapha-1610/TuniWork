import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { FreelancerSignupPageComponent } from './freelancer-signup-page/freelancer-signup-page.component';
import { FreelancerLoginPageComponent } from './freelancer-login-page/freelancer-login-page.component';
import { CompanyLoginPageComponent } from './company-login-page/company-login-page.component';
import { ComapnySignupPageComponent } from './comapny-signup-page/comapny-signup-page.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { RegestrationTypeSelectionComponent } from './regestration-type-selection/regestration-type-selection.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

@NgModule({
  declarations: [
    FreelancerSignupPageComponent,
    FreelancerLoginPageComponent,
    CompanyLoginPageComponent,
    ComapnySignupPageComponent,
    IndexComponent,
    LoginPageComponent,
    SignupPageComponent,
    RegestrationTypeSelectionComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
})
export class HomePageModule {}
