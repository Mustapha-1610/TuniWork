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
  FreelancerInfos: any = this.fs.getFreelancerCredits();
  PWOApply(id: any) {
    this.fs.applyPWO(this.FreelancerInfos._id, id).subscribe((res: any) => {
      this.errMessage = res.success || res.error;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.FreelancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferApplyed(id);
      }
    });
  }
  PWOUnapply(PWOId: any) {
    this.fs
      .unapplyPWO(this.FreelancerInfos._id, PWOId)
      .subscribe((res: any) => {
        this.errMessage = res.error || res.success;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
          this.FreelancerInfos = this.fs.getFreelancerCredits();
          this.isWorkOfferApplyed(PWOId);
        }
      });
  }
  SavePWO(PWOId: any, PWOTitle: any, PWODescription: any) {
    this.fs
      .savePWO(this.FreelancerInfos._id, PWOId, PWOTitle, PWODescription)
      .subscribe((res: any) => {
        console.log(res.success);
        this.errMessage = res.success || res.error;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));

          // Update your FreelancerInfos with the information from the response
          this.FreelancerInfos = res.freeLancerAccount;

          // Optionally, you can force Angular to check for changes
          this.isWorkOfferSaved(PWOId); // You need to inject ChangeDetectorRef in the constructor
        }
      });
  }
  unsavePwo(PWOId: any) {
    this.fs.unsavePwo(this.FreelancerInfos._id, PWOId).subscribe((res: any) => {
      this.errMessage = res.error || res.success;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.FreelancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferSaved(PWOId);
      }
    });
  }
  isWorkOfferSaved(workOfferId: any): boolean {
    return this.FreelancerInfos?.SavedWorkOffers?.some(
      (offer: any) => offer.WorkId === workOfferId
    );
  }
  isWorkOfferApplyed(workOfferId: any) {
    return this.FreelancerInfos?.PendingWorkOffers?.some(
      (pendingOffer: any) => pendingOffer.PublicJobOfferId === workOfferId
    );
  }
}
