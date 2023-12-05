import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
@Component({
  selector: 'app-submit-payment-request-page',
  templateUrl: './submit-payment-request-page.component.html',
  styleUrls: ['./submit-payment-request-page.component.css'],
})
export class SubmitPaymentRequestPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fs: FreelancerService) {}
  workId: any;
  errMessage: any;
  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('id');
    this.getPaymentRequestPageAccess();
  }
  getPaymentRequestPageAccess() {
    this.fs
      .accessPaymentRequestPage(this.route.snapshot.paramMap.get('id'))
      .subscribe((res: any) => {
        if (res.error) {
          this.errMessage = res.error;
        }
      });
  }
}
