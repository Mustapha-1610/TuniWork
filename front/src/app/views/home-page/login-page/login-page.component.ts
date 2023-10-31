import { Component } from '@angular/core';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';
import { FreelancerLoginPageComponent } from '../freelancer-login-page/freelancer-login-page.component';
import { CompanyLoginPageComponent } from '../company-login-page/company-login-page.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  displayedComponent: any = FreelancerLoginPageComponent;
  componentt = true;
  setComponent() {
    this.componentt = !this.componentt;
  }
  setUsersLoginComponent() {
    this.displayedComponent = FreelancerLoginPageComponent;
  }
  setCompanyLoginComponent() {
    this.displayedComponent = CompanyLoginPageComponent;
  }
}
