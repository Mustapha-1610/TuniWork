import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-talent-saved-freelancers',
  templateUrl: './talent-saved-freelancers.component.html',
  styleUrls: ['./talent-saved-freelancers.component.css']
})
export class TalentSavedFreelancersComponent implements OnInit {
  savedFreelancers: any[] = [];

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.refreshSavedFreelancers();
  }

  refreshSavedFreelancers(): void {
    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;

    this.companyService.getSavedFreelancers(companyId).subscribe(
      (response: any) => {
        this.savedFreelancers = response.savedFreelancers;
      },
      (error) => {
        console.error('Error fetching saved freelancers', error);
      }
    );
  }
  

  unsaveFreelancer(freelancerId: string): void {
    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;

    this.companyService.unsaveFreelancer(companyId, freelancerId).subscribe(
      (response: any) => {
        console.log(response.success);
        // Update local storage after successfully unsaving freelancer
        this.companyService.updateLocalStorageAfterUnsaveFreelancer(companyInfos, freelancerId);

        // Refresh the saved freelancers list
        this.refreshSavedFreelancers();
        // Automatically navigate back to the same route to trigger a refresh
        this.router.navigate(['/talent-saved-freelancers']);
      },
      (error) => {
        console.error('Error unsaving freelancer', error);
      }
    );
  }
}
