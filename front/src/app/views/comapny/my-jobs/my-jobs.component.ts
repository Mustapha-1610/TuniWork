import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {
  publicJobOffers: any[] = [];
  privateJobOffers: any[] = [];

  constructor(private cs: CompanyService) {}


  ngOnInit(): void {
    this.fetchPrivateJobOffers();
    this.fetchPublicJobOffers();

  }

  fetchPublicJobOffers(){
    const companyInfos = this.cs.getCompanyInfos();
    const companyId = companyInfos?._id;

    this.cs.getAllPublicJobOffers(companyId).subscribe(
      (response: any) => {
        this.publicJobOffers = response;
        console.log(this.publicJobOffers);
      },
      (error) => {
        console.error('Error fetching job offers', error);
      }
    );
  }


  onDelete(publicJobOfferId: string): void {
    this.cs.deletePublicJobOffer(publicJobOfferId).subscribe(
      (response: any) => {
        console.log(response.success);
        this.publicJobOffers = this.publicJobOffers.filter(publicJobOffer => publicJobOffer._id !== publicJobOfferId);
      },
      (error) => {
        console.error('Error deleting public job offer', error);
      }
    );
  }


  fetchPrivateJobOffers(){
    const companyInfos = this.cs.getCompanyInfos();
    const companyId = companyInfos?._id;

    this.cs.getAllPrivateJobOffers(companyId).subscribe(
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
    this.cs.deletePrivateJobOffer(privateJobOfferId).subscribe(
      (response: any) => {
        console.log(response.success);
        this.privateJobOffers = this.privateJobOffers.filter(jobOffer => jobOffer._id !== privateJobOfferId);
      },
      (error) => {
        console.error('Error deleting private job offer', error);
      }
    );
  }


  

}
