import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtServiceService } from '../../services/jwt-service.service';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.css'],
})
export class PasswordResetPageComponent implements OnInit {
  constructor(
    private fs: FreelancerService,
    private jwtService: JwtServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  _id: any;
  PasswordForm: any;
  token: any;
  expired: any = null;
  errMessage: any;
  ngOnInit() {
    this.PasswordForm = new FormGroup({
      newPassword: new FormControl(null),
      newPasswordConfirm: new FormControl(null),
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (this.token) {
        if (this.jwtService.isTokenExpired(this.token)) {
          this.expired = true;
        } else {
          console.log('unexpired');
        }
      }
    });
  }
  submitPassReset() {
    this.fs
      .ResetPass(
        this.token,
        this.PasswordForm.value.newPassword,
        this.PasswordForm.value.newPasswordConfirm
      )
      .subscribe((res: any) => {
        this.errMessage = res.error || res.success;
      });
  }
  ResendForgetPass() {
    this.router.navigate(['/ForgetPassword']);
  }
}
