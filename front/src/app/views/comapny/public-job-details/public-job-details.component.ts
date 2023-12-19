import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { FreelancerService } from '../../services/freelancer.service';


@Component({
  selector: 'app-public-job-details',
  templateUrl: './public-job-details.component.html',
  styleUrls: ['./public-job-details.component.css'],
})
export class PublicJobDetailsComponent implements OnInit {
  publicJobOffer: any;
  idsArrays: any[] = [];
  successMessage: any;
  progress: any = 0;
  progressPercentage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private fs: FreelancerService,
    private router: Router
  ) {}


  workId: any;
  publicJobOfferId:any;
  workData: any;
  add: boolean = true;
  submitRequestButton: any = null;

  ngOnInit(): void {

    /*track progress */

      this.workId = this.route.snapshot.paramMap.get('id');
      this.getCompanyWorkOffer();


    // Get the public job offer ID from the route parameters
    const publicJobOfferId = this.route.snapshot.paramMap.get('publicJobOfferId');

    // Fetch details of the public job offer
    this.companyService.getPublicJobDetails(publicJobOfferId).subscribe(
      (response: any) => {
        this.publicJobOffer = response.publicJobOffer;
        console.log(this.publicJobOffer);
      },
      (error) => {
        console.error('Error fetching public job details', error);
      }
    );
  }

  acceptFreelancer(publicJobOfferId: string, freelancerId: string): void {
    this.companyService.acceptFreelancer(publicJobOfferId, freelancerId).subscribe(
      (response: any) => {
        console.log(response.success);
        // Find the freelancer in the AppliedFreelancers array and update their status
        const freelancerIndex = this.publicJobOffer.AppliedFreelancers.findIndex((f: any) => f.FreelancerId === freelancerId);
        if (freelancerIndex !== -1) {
          this.publicJobOffer.AppliedFreelancers[freelancerIndex].Status = 'freelancer accepted';
          this.publicJobOffer.status = 'freelancer accepted';
        }

      },
      (error) => {
        console.error('Error accepting freelancer', error);
      }
    );
  }

  createContract(publicJobOfferId: string) {
    this.companyService.sendContract(publicJobOfferId, null).subscribe(
      (response: any) => {
        console.log(response.success);
        this.publicJobOffer.status = 'Contract Sent Awaiting Freelancer Response';
        this.companyService.updateLocalStorageAfterSendingContract(this.publicJobOffer);
      },
      (error) => {
        console.error('Error sending contract', error);
      }
    );
  }


  /*track progress*/

  getCompanyWorkOffer() {
    this.fs.getWorkOfferProgress(this.workId).subscribe((res: any) => {
      if (res.error) {
        this.router.navigate(['/freelancer']);
      } else {
        this.workData = res.workOffer;
        this.progressCounter();
        if (this.progress === this.workData.TaskTable.length) {
          this.submitRequestButton = true;
        }
      }
    });
  }

  progressCounter() {
    this.progress = 0;
    console.log(this.workData);
    this.workData.TaskTable.map((item: any) => {
      if (item.TaskDoneStatus) {
        this.progress = this.progress + 1;
      }
    });
    this.progressPercentage =
      (this.progress / this.workData.TaskTable.length) * 100;
    if (this.progress === this.workData.TaskTable.length) {
      this.submitRequestButton = true;
    }
  }

}
