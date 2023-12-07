import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
@Component({
  selector: 'app-recieved-work-offers',
  templateUrl: './recieved-work-offers.component.html',
  styleUrls: ['./recieved-work-offers.component.css'],
})
export class RecievedWorkOffersComponent implements OnInit {
  constructor(private fs: FreelancerService) {}
  freelancerInfos: any;
  CompanyContracts: any;
  ngOnInit(): void {
    this.freelancerInfos = this.fs.getFreelancerCredits();
    this.CompanyContracts = this.freelancerInfos.CompanyRecievedContracts;
  }
}
