import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FreelancerLoginPageComponent } from './freelancer-login-page/freelancer-login-page.component';
import { FreelancerSignupPageComponent } from './freelancer-signup-page/freelancer-signup-page.component';
import { CompanyLoginPageComponent } from './company-login-page/company-login-page.component';
import { ComapnySignupPageComponent } from './comapny-signup-page/comapny-signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { FreelancerVerificationPageComponent } from './freelancer-verification-page/freelancer-verification-page.component';
import { FreelancerGoogleSignupComponent } from './freelancer-google-signup/freelancer-google-signup.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { CustomerSignupPageComponent } from './customer-signup-page copy/customer-signup-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'Fsignup', component: FreelancerSignupPageComponent },
  { path: 'Csignup', component: CustomerSignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'Fverification',
    component: FreelancerVerificationPageComponent,
  },
  {
    path: 'FGsignup',
    component: FreelancerGoogleSignupComponent,
  },
  {
    path: 'PassReset',
    component: PasswordResetPageComponent,
  },
  {
    path: 'ForgetPassword',
    component: ForgetPasswordPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
