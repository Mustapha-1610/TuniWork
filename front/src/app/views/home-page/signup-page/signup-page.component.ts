import { Component } from '@angular/core';
import { FreelancerLoginPageComponent } from '../freelancer-login-page/freelancer-login-page.component';
import { RegestrationTypeSelectionComponent } from '../regestration-type-selection/regestration-type-selection.component';
import { ComapnySignupPageComponent } from '../comapny-signup-page/comapny-signup-page.component';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  displayedComponent: any = RegestrationTypeSelectionComponent;
  componentt = true;
  setComponent() {
    this.componentt = !this.componentt;
  }
  setUsersLoginComponent() {
    this.displayedComponent = RegestrationTypeSelectionComponent;
  }
  setCompanyLoginComponent() {
    this.displayedComponent = ComapnySignupPageComponent;
  }
}
