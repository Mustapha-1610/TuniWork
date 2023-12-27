import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { catchError, tap } from 'rxjs/operators';


interface SavedFreelancer {
  freelancerId: string;
  freelancerName: string;
}

@Component({
  selector: 'app-talent-freelancer-profile',
  templateUrl: './talent-freelancer-profile.component.html',
  styleUrls: ['./talent-freelancer-profile.component.css']
})
export class TalentFreelancerProfileComponent {
  freelancerDetails: any;
  isFreelancerNotSaved: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private cus: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const freelancerId = params['freelancerId'];
      this.cus.getFreelancerDetails(freelancerId).subscribe(
        (response: any) => {
          this.freelancerDetails = response.freelancer;
          this.checkIfFreelancerSaved();
        },
        (error: any) => {
          console.error('Error fetching freelancer details', error);
        }
      );
    });
  }
  checkIfFreelancerSaved(): void {
    const customerInfos = this.cus.getCustomerInfos();
    if (customerInfos && customerInfos.SavedFreelancers) {
      this.isFreelancerNotSaved = !customerInfos.SavedFreelancers.some(
        (saved: SavedFreelancer) => saved.freelancerId === this.freelancerDetails._id
      );
    }
  }


  saveFreelancer(freelancerId: string): void {
    const customerInfos = this.cus.getCustomerInfos();
    const customerId = customerInfos._id;

    this.cus.saveFreelancer(customerId, freelancerId).pipe(
      tap(() => {
        this.isFreelancerNotSaved = false;
        this.cus.updateLocalStorageAfterSaveFreelancer(freelancerId);
      })
    ).subscribe(
      (response: any) => {
        console.log(response.success);
        // Handle success (e.g., show a success message to the user)
      },
      (error) => {
        console.error('Error saving freelancer', error);
      }
    );
  }

  navigateToPrivateJobCreate(freelancerId: string): void {
    this.router.navigate(['/customer/private-job-create', freelancerId]);
  }
}
 