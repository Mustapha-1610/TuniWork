import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applyed-jobs-component',
  templateUrl: './applyed-jobs-component.component.html',
  styleUrls: ['./applyed-jobs-component.component.css'],
})
export class ApplyedJobsComponentComponent implements OnInit {
  constructor(private fs: FreelancerService, private router: Router) {}
  ngOnInit(): void {
    this.getMatchingWorkOffers();
  }
  freeLancerInfos: any = this.fs.getFreelancerCredits();
  MatchingJobs: any;
  errMessage: any;
  publicWorkOfferInfos: any;
  getMatchingWorkOffers() {
    this.fs
      .getBestMatchingWO(this.freeLancerInfos._id)
      .subscribe((res: any) => {
        this.MatchingJobs = res.matchingJobOffers;
      });
  }
  CheckOffre(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WorkOffer', id]);
  }
  PWOUnapply(PWOId: any) {
    this.fs
      .unapplyPWO(this.freeLancerInfos._id, PWOId)
      .subscribe((res: any) => {
        this.errMessage = res.error || res.success;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
          this.freeLancerInfos = this.fs.getFreelancerCredits();
          this.isWorkOfferApplyed(PWOId);
        }
      });
  }
  isWorkOfferApplyed(workOfferId: any) {
    return this.freeLancerInfos?.PendingWorkOffers?.some(
      (pendingOffer: any) => pendingOffer.PublicJobOfferId === workOfferId
    );
  }
}
