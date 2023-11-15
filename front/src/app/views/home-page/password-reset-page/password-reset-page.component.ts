import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.css'],
})
export class PasswordResetPageComponent implements OnInit {
  constructor(private fs: FreelancerService, private route: ActivatedRoute) {}
  _id: any;
  PasswordForm: any;
  token: any;
  ngOnInit() {
    this.PasswordForm = new FormGroup({
      Password: new FormControl(null),
      newPassword: new FormControl(null),
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }
  submitPassReset() {
    this.fs
      .ResetPass(
        this.token,
        this.PasswordForm.Password,
        this.PasswordForm.newPassword
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
