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
    console.log(this.loginForm.value);
    this.fs.auth(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      if (res.error) {
        this.errMessage = res.error;
        console.log('error');
      } else if (res.freeLancerAccount) {
        const FreelancerAccount: any = {
          Name: res.freeLancerAccount.Name,
          Surname: res.freeLancerAccount.Surname,
        };
        localStorage.setItem(
          'freeLancerInfos',
          JSON.stringify(FreelancerAccount)
        ); // Convert object to string before storing in localStorage
        this.route.navigate(['/freelancer']);
      }
    });
  }
}
