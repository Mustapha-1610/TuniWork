import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-private-job-details',
  templateUrl: './private-job-details.component.html',
  styleUrls: ['./private-job-details.component.css']
})
export class PrivateJobDetailsComponent implements OnInit{
  privateJobOffer: any;

  constructor( private route: ActivatedRoute, private cus: CustomerService  ) {}

  ngOnInit(): void {
    const privateJobOfferId = this.route.snapshot.paramMap.get('privateJobOfferId');

    // fetchi l  private job offer details using cs
    this.cus.getPrivateJobOfferDetails(privateJobOfferId).subscribe(
      (response: any) => {
        this.privateJobOffer = response;
        console.log(this.privateJobOffer);
      },
      (error) => {
        console.error('Error fetching private job offer details', error);
      }
    );
  }


}
