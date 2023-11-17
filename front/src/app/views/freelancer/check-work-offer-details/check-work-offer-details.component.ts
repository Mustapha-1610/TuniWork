import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-check-work-offer-details',
  templateUrl: './check-work-offer-details.component.html',
  styleUrls: ['./check-work-offer-details.component.css'],
})
export class CheckWorkOfferDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private fs: FreelancerService) {}
  ngOnInit() {
    this.fs
      .getPublicWorkOfferInfos(this.route.snapshot.paramMap.get('id'))
      .subscribe((res: any) => {
        if (res.PWO) {
          this.publicWorkOfferInfos = res.PWO;
        } else {
          this.errMessage = res.error;
        }
      });
  }
  publicWorkOfferInfos: any;
  errMessage: any = false;
}
