// talent-freelancers.component.ts

import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-talent-freelancers',
  templateUrl: './talent-freelancers.component.html',
  styleUrls: ['./talent-freelancers.component.css']
})
export class TalentFreelancersComponent implements OnInit {
  freelancers: any[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.fetchFreelancers();
  }

  fetchFreelancers(): void {
    this.companyService.getAllFreelancers().subscribe(
      (response: any) => {
        this.freelancers = response.allfreelancers;
        console.log(this.freelancers);
      },
      (error) => {
        console.error('Error fetching freelancers', error);
      }
    );
  }
}
