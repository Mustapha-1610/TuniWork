import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FreelancerService } from '../../services/freelancer.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-freelancer-verification-page',
  templateUrl: './freelancer-verification-page.component.html',
  styleUrls: ['./freelancer-verification-page.component.css'],
})
export class FreelancerVerificationPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fs: FreelancerService,
    private spinner: NgxSpinnerService
  ) {}
  _id: any;
  vcode: any;
  freelancerVerificationInfos: any;
  errMessage: any = null;
  mailerr: boolean = false;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      if (token) {
        this.spinner.show();
        try {
          const decoded = jwtDecode(token) as any;
          this._id = decoded.id;
          this.vcode = decoded.vcode;
          this.fs
            .verifyFreelancer(this._id, this.vcode)
            .subscribe((res: any) => {
              this.spinner.hide();
              if (res.success) {
                this.errMessage = res.success;
              }
              if (res.error) {
                this.errMessage = res.error;
              } else if (res.expireError) {
                this.mailerr = true;
              }
            });
        } catch (error) {
          // Handle decoding errors, for example: token is malformed
          console.error('Error decoding the token', error);
        }
      }
    });
  }
  sendVerLink() {
    this.fs.sendVerLink(this._id, null).subscribe((res: any) => {
      this.mailerr = false;
      this.errMessage = res.success;
      console.log(res);
    });
  }
}
