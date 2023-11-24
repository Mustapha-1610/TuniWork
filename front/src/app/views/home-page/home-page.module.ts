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
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import 'firebase/compat/storage';
import { FreelancerVerificationPageComponent } from './freelancer-verification-page/freelancer-verification-page.component';
import { environment } from 'src/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OAuthModule } from 'angular-oauth2-oidc';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FreelancerGoogleSignupComponent } from './freelancer-google-signup/freelancer-google-signup.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';

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
    FreelancerVerificationPageComponent,
    FreelancerGoogleSignupComponent,
    ForgetPasswordPageComponent,
    PasswordResetPageComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage(getApp())),
    MatProgressBarModule,
    OAuthModule,
    OAuthModule.forRoot(),
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '571037053668-ds96a2gqbve5av8uh1ed7kkeml7vf0r7.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class HomePageModule {}
