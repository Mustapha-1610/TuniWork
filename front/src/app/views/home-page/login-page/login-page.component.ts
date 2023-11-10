import { Component, OnInit } from '@angular/core';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';
import { FreelancerLoginPageComponent } from '../freelancer-login-page/freelancer-login-page.component';
import { CompanyLoginPageComponent } from '../company-login-page/company-login-page.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private fs: FreelancerService, private route: Router) {}
  loginForm: any;
  errMessage: any;
  ngOnInit() {
    this.loginForm = new FormGroup({
      Email: new FormControl(null),
      Password: new FormControl(null),
    });
  }
  submitLoginForm() {
    this.fs.auth(this.loginForm.value).subscribe((res: any) => {
      if (res.error) {
        this.errMessage = res.error;
      } else if (res.freelancerAccount) {
        const FreelancerAccount: any = {
          Name: res.freelancerAccount.Name,
          Surname: res.freelancerAccount.Surname,
          ProfilePicture: res.freelancerAccount.ProfilePicture,
          _id: res.freelancerAccount._id,
          Email: res.freelancerAccount.Email,
          PhoneNumber: res.freelancerAccount.PhoneNumber,
          WorkTitle: res.freelancerAccount.WorkTitle.WorkTitleText,
          Specialities: res.freelancerAccount.Speciality,
          WorkHistory: res.freelancerAccount.WorkHistory,
          EstimatedWorkLocation: res.freelancerAccount.EstimatedWorkLocation,
          Languages: res.freelancerAccount.Languages,
          PayRates: res.freelancerAccount.PayRate,
          Schedule: res.freelancerAccount.Schedule,
        };
        this.fs.setFreelancerCredits(JSON.stringify(FreelancerAccount));
        this.route.navigate(['/freelancer']);
      }
    });
  }
}
