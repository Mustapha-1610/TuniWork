import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  privateCJoboffers: any[] = [];

  isDeleteConfirmationVisible = false;
  selectedCJobOffer: any; 
  
  constructor(private cus: CustomerService) {} 

  ngOnInit(): void {
    this.fetchPrivateCJoboffers();
  }

  fetchPrivateCJoboffers() {
    const customerInfos = this.cus.getCustomerInfos(); 
    const customerId = customerInfos?._id;

    this.cus.getAllPrivateJobOffers(customerId).subscribe(
      (response: any) => {
        this.privateCJoboffers = response;
        console.log(this.privateCJoboffers);
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
        this.privateCJoboffers = this.privateCJoboffers.filter(jobOffer => jobOffer._id !== privateJobOfferId);
      },
      (error) => {
        console.error('Error deleting private job offer', error);
      }
    );
  }

 /* selectedOffer: any;

  showDeleteConfirmation(privatecjoboffer: any): void {
    this.isDeleteConfirmationVisible = true;
    this.selectedOffer = privatecjoboffer;
  }

  confirmDelete(): void {
    this.isDeleteConfirmationVisible = false;
    this.onDeletePrivateJobOffer(this.selectedOffer._id);
    console.log('Suppression confirmée pour : ', this.selectedOffer);
    this.cancelDelete();
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
    this.selectedOffer = null;
  }*/
  

}
