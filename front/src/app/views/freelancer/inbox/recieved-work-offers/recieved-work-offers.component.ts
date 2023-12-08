import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recieved-work-offers',
  templateUrl: './recieved-work-offers.component.html',
  styleUrls: ['./recieved-work-offers.component.css'],
})
export class RecievedWorkOffersComponent implements OnInit {
  constructor(private fs: FreelancerService, private router: Router) {}
  freelancerInfos: any;
  WorkOffers: any;

  ngOnInit(): void {
    this.freelancerInfos = this.fs.getFreelancerCredits();
    this.WorkOffers = this.freelancerInfos.ProposedPrivateWorks;
  }
  checkPWO(id: any) {
    this.router.navigate(['/freelancer/checkPWOInfos', id]);
  }
}
