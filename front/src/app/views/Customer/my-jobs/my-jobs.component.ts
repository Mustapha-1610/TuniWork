import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service'; // Update the import statement

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  publicJobOffers: any[] = [];
  privateJobOffers: any[] = [];

  constructor(private customerService: CustomerService) {} // Update the service injection

  ngOnInit(): void {
    this.fetchPrivateJobOffers();
   
  }

 

  fetchPrivateJobOffers() {
    const customerInfos = this.customerService.getCustomerInfos(); // Update the method and variable names
    const customerId = customerInfos?._id;

    this.customerService.getAllPrivateJobOffers(customerId).subscribe( // Update the method name
      (response: any) => {
        this.privateJobOffers = response;
        console.log(this.privateJobOffers);
      },
      (error) => {
        console.error('Error fetching job offers', error);
      }
    );
  }

  

 
}
