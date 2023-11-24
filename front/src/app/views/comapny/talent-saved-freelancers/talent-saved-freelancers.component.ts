import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-talent-saved-freelancers',
  templateUrl: './talent-saved-freelancers.component.html',
  styleUrls: ['./talent-saved-freelancers.component.css']
})
export class TalentSavedFreelancersComponent implements OnInit {
  savedFreelancers: any[] = []; 

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

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
}
