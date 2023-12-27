import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-talent-freelancers',
  templateUrl: './talent-freelancers.component.html',
  styleUrls: ['./talent-freelancers.component.css']
})
export class TalentFreelancersComponent implements OnInit {

  freelancers: any[] = [];

  constructor(private cus: CustomerService) { }

  ngOnInit(): void {
    this.fetchFreelancers();
  }

  fetchFreelancers(): void {
    this.cus.getAllFreelancers().subscribe(
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
