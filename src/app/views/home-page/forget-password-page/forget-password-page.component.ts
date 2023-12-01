import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FreelancerService } from '../../services/freelancer.service';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css'],
})
export class ForgetPasswordPageComponent implements OnInit {
  constructor(private fs: FreelancerService, private route: ActivatedRoute) {}
  resMessage: any;
  EmailForm: any;
  _id: any;
  ngOnInit() {
    this.EmailForm = new FormGroup({
      Email: new FormControl(null),
    });
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        console.log(token);
        try {
          const decoded = jwtDecode(token) as any;
          this._id = decoded.id;
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
  SubmitPassResetRequest() {
    this.fs
      .sendPassResetMail(this.EmailForm.value.Email)
      .subscribe((res: any) => {
        console.log(res);
        this.resMessage = res.error || res.success;
      });
  }
}
