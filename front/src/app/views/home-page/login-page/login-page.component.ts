import { Component, OnInit } from '@angular/core';
import { FreelancerSignupPageComponent } from '../freelancer-signup-page/freelancer-signup-page.component';
import { FreelancerLoginPageComponent } from '../freelancer-login-page/freelancer-login-page.component';
import { CompanyLoginPageComponent } from '../company-login-page/company-login-page.component';
import { FormControl, FormGroup } from '@angular/forms';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fs: FreelancerService,
    private route: Router,
    private authService: SocialAuthService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      Email: new FormControl(null),
      Password: new FormControl(null),
    });
    this.authService.authState.subscribe((user) => {
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
    });
  }
  loginForm: any;
  errMessage: any;
  user: any;

  submitLoginForm() {
    this.fs.auth(this.loginForm.value).subscribe((res: any) => {
      if (res.error) {
        this.errMessage = res.error;
      } else if (res.freelancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.route.navigate(['/freelancer']);
      }
    });
  }
}
