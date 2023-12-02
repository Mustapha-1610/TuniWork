// Import necessary modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { catchError, tap } from 'rxjs/operators';

// Define an interface for saved freelancer
interface SavedFreelancer {
  freelancerId: string;
  freelancerName: string;
}

@Component({
  selector: 'app-talent-freelancer-profile',
  templateUrl: './talent-freelancer-profile.component.html',
  styleUrls: ['./talent-freelancer-profile.component.css'],
})
export class TalentFreelancerProfileComponent implements OnInit {
  freelancerDetails: any;
  isFreelancerNotSaved: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const freelancerId = params['freelancerId'];
      this.companyService.getFreelancerDetails(freelancerId).subscribe(
        (response: any) => {
          this.freelancerDetails = response.freelancer;
          this.checkIfFreelancerSaved();
        },
        (error) => {
          console.error('Error fetching freelancer details', error);
        }
      );
    });
  }

  checkIfFreelancerSaved(): void {
    const companyInfos = this.companyService.getCompanyInfos();
    if (companyInfos && companyInfos.SavedFreelancers) {
      // Check if the freelancer is saved when the component is initialized
      this.isFreelancerNotSaved = !companyInfos.SavedFreelancers.some(
        (saved: SavedFreelancer) => saved.freelancerId === this.freelancerDetails._id
      );
    }
  }

  saveFreelancer(freelancerId: string): void {
    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;

    this.companyService.saveFreelancer(companyId, freelancerId).pipe(
      tap(() => {
        this.isFreelancerNotSaved = false;
        this.companyService.updateLocalStorageAfterSaveFreelancer(freelancerId);
      })
    ).subscribe(
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
    this.router.navigate(['/company/private-job-create', freelancerId]);
  }
}
