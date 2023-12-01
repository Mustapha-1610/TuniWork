import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HomePageService } from '../../services/home-page.service';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';
import { CompanyLoginPageComponent } from '../company-login-page/company-login-page.component';
import { ComapnySignupPageComponent } from '../comapny-signup-page/comapny-signup-page.component';

@Component({
  selector: 'app-freelancer-login-page',
  templateUrl: './freelancer-login-page.component.html',
  styleUrls: ['./freelancer-login-page.component.css'],
})
export class FreelancerLoginPageComponent {
  constructor(private ds: HomePageService) {}
  profileForm = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl(''),
  });
  componentt = true;
  freelancerSignupComponent: any = FreelancerSignupPageComponent;
  ngOnInit(): void {}
  onSubmit() {
    console.log(this.profileForm.value);
    this.ds
      .getAllFreelancers(this.profileForm.value)
      .subscribe((data) => console.log(data));
  }
  setComponent() {
    this.componentt = !this.componentt;
  }
  changeComponent() {
    if (this.componentt) {
      this.freelancerSignupComponent = ComapnySignupPageComponent;
    } else {
      this.freelancerSignupComponent = FreelancerSignupPageComponent;
    }
    this.setComponent();
  }
}
