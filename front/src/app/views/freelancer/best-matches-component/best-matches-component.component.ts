import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-best-matches-component',
  templateUrl: './best-matches-component.component.html',
  styleUrls: ['./best-matches-component.component.css'],
})
export class BestMatchesComponentComponent implements OnInit {
  constructor(private fs: FreelancerService, private router: Router) {}
  ngOnInit(): void {
    this.getMatchingWorkOffers();
  }
  freeLancerInfos: any = this.fs.getFreelancerCredits();
  MatchingJobs: any;
  getMatchingWorkOffers() {
    this.fs
      .getBestMatchingWO(this.freeLancerInfos._id)
      .subscribe((res: any) => {
        this.MatchingJobs = res.matchingJobOffers;
        console.log(this.MatchingJobs);
      });
  }
  CheckOffre(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WorkOffer', id]);
  }
  SaveJobOffer(id: any) {
    console.log(id);
  }
}
