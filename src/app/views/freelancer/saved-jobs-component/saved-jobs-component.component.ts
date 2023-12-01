import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-jobs-component',
  templateUrl: './saved-jobs-component.component.html',
  styleUrls: ['./saved-jobs-component.component.css'],
})
export class SavedJobsComponentComponent implements OnInit {
  constructor(private fs: FreelancerService, private router: Router) {}
  freeLancerInfos: any;
  errMessage: any;
  ngOnInit() {
    this.freeLancerInfos = this.fs.getFreelancerCredits();
  }
  CheckOffre(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WorkOffer', id]);
  }
  PWOApply(id: any) {
    this.fs.applyPWO(this.freeLancerInfos._id, id).subscribe((res: any) => {
      this.errMessage = res.success || res.error;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.freeLancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferApplyed(id);
      }
    });
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
  SavePWO(PWOId: any, PWOTitle: any, PWODescription: any) {
    this.fs
      .savePWO(this.freeLancerInfos._id, PWOId, PWOTitle, PWODescription)
      .subscribe((res: any) => {
        console.log(res.success);
        this.errMessage = res.success || res.error;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));

          // Update your FreelancerInfos with the information from the response
          this.freeLancerInfos = res.freeLancerAccount;

          // Optionally, you can force Angular to check for changes
          this.isWorkOfferSaved(PWOId); // You need to inject ChangeDetectorRef in the constructor
        }
      });
  }
  unsavePwo(PWOId: any) {
    this.fs.unsavePwo(this.freeLancerInfos._id, PWOId).subscribe((res: any) => {
      this.errMessage = res.error || res.success;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));

        this.freeLancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferSaved(PWOId);
      }
    });
  }
  isWorkOfferSaved(workOfferId: any): boolean {
    return this.freeLancerInfos?.SavedWorkOffers?.some(
      (offer: any) => offer.WorkId === workOfferId
    );
  }
  isWorkOfferApplyed(workOfferId: any) {
    return this.freeLancerInfos?.PendingWorkOffers?.some(
      (pendingOffer: any) => pendingOffer.PublicJobOfferId === workOfferId
    );
  }
}
