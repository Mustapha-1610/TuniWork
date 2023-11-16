import { Component, OnInit } from '@angular/core';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';
import { FreelancerLoginPageComponent } from '../freelancer-login-page/freelancer-login-page.component';
import { CompanyLoginPageComponent } from '../company-login-page/company-login-page.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CompanyService } from '../../services/company.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fs: FreelancerService,
    private cs: CompanyService,
    private route: Router,
    private authService: SocialAuthService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      Email: new FormControl(null),
      Password: new FormControl(null),
    });

    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.fs.googleLogin(user.email).subscribe((res: any) => {
          if (res.freelancerAccount) {
            this.fs.setFreelancerCredits(JSON.stringify(res.freelancerAccount));
            this.route.navigate(['/freelancer']);
          } else {
            this.fs.sendData(this.user);
            this.route.navigate(['/signup']);
          }
        });
      }
    });
  }
  loginForm: any;
  errMessage: any;
  mailError: any = null;
  user: any;

  submitLoginForm() {
    this.errMessage = '';
    this.mailError = null;
    this.fs.auth(this.loginForm.value).subscribe((res: any) => {
      if (res.error) {
        this.errMessage = res.error;
      } else if (res.freelancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freelancerAccount));
        this.route.navigate(['/freelancer']);
      } else if (res.comapnyAccount) {
        console.log(res.comapnyAccount);
        this.cs.setCompanyInfos(JSON.stringify(res.comapnyAccount));
        this.route.navigate(['/company/profile']);
      } else if (res.emailError) {
        this.mailError = res.emailError;
      }
    });
  }
  sendEmail() {
    this.fs
      .sendVerLink(null, this.loginForm.value.Email)
      .subscribe((res: any) => {
        if (res.error) {
          this.errMessage = res.error;
        } else if (res.success) {
          this.mailError = null;
          this.errMessage = res.success;
        }
      });
  }
  routeFP() {
    this.route.navigate(['/ForgetPassword']);
  }
}
