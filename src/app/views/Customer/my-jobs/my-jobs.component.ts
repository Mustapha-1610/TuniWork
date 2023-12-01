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




  fetchPrivateJobOffers(){
   /* const customerInfos = this.cus.getCustomerInfos();
    const customerId = customerInfos?._id;

    this.cus.getAllPrivateJobOffers(customerId).subscribe(
      (response: any) => {
        this.privateJobOffers = response;
        console.log(this.privateJobOffers);
      },
      (error) => {
        console.error('Error fetching job offers', error);
      }
    );
  }
  onDeletePrivateJobOffer(privateJobOfferId: string): void {
    this.cus.deletePrivateJobOffer(privateJobOfferId).subscribe(
      (response: any) => {
        console.log(response.success);
        this.privateJobOffers = this.privateJobOffers.filter(jobOffer => jobOffer._id !== privateJobOfferId);
      },
      (error) => {
        console.error('Error deleting private job offer', error);
      }
    );*/
  }


  ngOnInit(): void {
    this.fetchPrivateJobOffers();
    
  }

}
