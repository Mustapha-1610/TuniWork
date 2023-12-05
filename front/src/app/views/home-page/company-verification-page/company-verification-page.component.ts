import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from '../../services/company.service';
@Component({
  selector: 'app-company-verification-page',
  templateUrl: './company-verification-page.component.html',
  styleUrls: ['./company-verification-page.component.css'],
})
export class CompanyVerificationPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cs: CompanyService,
    private spinner: NgxSpinnerService
  ) {}
  _id: any;
  vcode: any;
  companyVerificationInfos: any;
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
          this.cs.verifyCompany(this._id, this.vcode).subscribe((res: any) => {
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
    this.cs.sendVerLink(this._id, null).subscribe((res: any) => {
      this.mailerr = false;
      this.errMessage = res.success;
      console.log(res);
    });
  }
}
