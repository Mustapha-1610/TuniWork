import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-public-job-details',
  templateUrl: './public-job-details.component.html',
  styleUrls: ['./public-job-details.component.css'],
})
export class PublicJobDetailsComponent implements OnInit {
  publicJobOffer: any;

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    // get the public jo ID from the route parameters
    const publicJobOfferId = this.route.snapshot.paramMap.get('publicJobOfferId');


    this.companyService.getPublicJobDetails(publicJobOfferId).subscribe(
      (response: any) => {
        this.publicJobOffer = response.publicJobOffer;
        console.log(this.publicJobOffer);
      },
      (error) => {
        console.error('Error fetching public job details', error);
      }
    );
  }
}
