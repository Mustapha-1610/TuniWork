import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
@Component({
  selector: 'app-pwo-infos',
  templateUrl: './pwo-infos.component.html',
  styleUrls: ['./pwo-infos.component.css'],
})
export class PwoInfosComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fs: FreelancerService,
    private router: Router
  ) {}
  workId: any;
  workData: any;
  ngOnInit() {
    this.workId = this.route.snapshot.paramMap.get('id');
    this.getPWOInfos();
  }
  getPWOInfos() {
    this.fs
      .getPrivateWorkOfferInfos(this.route.snapshot.paramMap.get('id'))

      .subscribe((res: any) => {
        this.workData = res.infos;
        console.log(this.workData);
      });
  }
  acceptWork() {
    this.fs.acceptPrivateWorkOffer(this.workData._id).subscribe((res: any) => {
      console.log(res.freelancerAccount);

      if (res.freelancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freelancerAccount));
        this.getPWOInfos();
      }
    });
  }
  declineWork() {
    this.fs.declinePrivateWorkOffer(this.workData._id).subscribe((res: any) => {
      if (res.freelancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freelancerAccount));
        this.getPWOInfos();
      }
    });
  }
}
