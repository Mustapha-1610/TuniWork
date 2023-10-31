import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { FreelancerLoginPageComponent } from './freelancer-login-page/freelancer-login-page.component';
import { FreelancerSignupPageComponent } from './freelancer-signup-page/freelancer-signup-page.component';
import { CompanyLoginPageComponent } from './company-login-page/company-login-page.component';
import { ComapnySignupPageComponent } from './comapny-signup-page/comapny-signup-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'Fsignup', component: FreelancerSignupPageComponent },
  { path: 'Csignup', component: ComapnySignupPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
