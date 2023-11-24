// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-talent-freelancer-profile',
  templateUrl: './talent-freelancer-profile.component.html',
  styleUrls: ['./talent-freelancer-profile.component.css'],
})
export class TalentFreelancerProfileComponent implements OnInit {
  freelancerDetails: any;

  constructor(
    private route: ActivatedRoute, private companyService: CompanyService, private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const freelancerId = params['freelancerId'];
      this.companyService.getFreelancerDetails(freelancerId).subscribe(
        (response: any) => {
          this.freelancerDetails = response.freelancer;
        },
        (error) => {
          console.error('Error fetching freelancer details', error);
        }
      );
    });
  }

  saveFreelancer(freelancerId: string): void {
    // jib l  company ID from local storage
    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;

    this.companyService.saveFreelancer(companyId, freelancerId).subscribe(
      (response: any) => {
        console.log(response.success);
        // Handle success (e.g., show a success message to the user)
      },
      (error) => {
        console.error('Error saving freelancer', error);
      }
    );
  }

  navigateToPrivateJobCreate(freelancerId: string): void {
    this.router.navigate(['/private-job-create', freelancerId]);
  }

}
