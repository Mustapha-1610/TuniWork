import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit{
  privateJobOffers: any[] = [];


  constructor(private cus: CustomerService) {}




  
    
  

  ngOnInit(): void {
    this.cus.getPrivateJobs().subscribe((res: any) => {
      this.privateJobOffers = res;
      console.log(this.privateJobOffers);
    });
  }
}