import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-public-job-details',
  templateUrl: './public-job-details.component.html',
  styleUrls: ['./public-job-details.component.css'],
})
export class PublicJobDetailsComponent implements OnInit {
  publicJobOffer: any; // Adjust the type based on your data model

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

  ngOnInit(): void {
    // Get the public job offer ID from the route parameters
    const publicJobOfferId = this.route.snapshot.paramMap.get('publicJobOfferId');

    // Fetch details of the public job offer
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

  acceptFreelancer(publicJobOfferId: string, freelancerId: string): void {
    // Call your CompanyService method to send the accept request to the server
    this.companyService.acceptFreelancer(publicJobOfferId, freelancerId).subscribe(
      (response: any) => {
        console.log(response.success);
        // Update the local data or perform any necessary actions
      },
      (error) => {
        console.error('Error accepting freelancer', error);
      }
    );
  }
}
