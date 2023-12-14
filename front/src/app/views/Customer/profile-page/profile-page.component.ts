import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  companyData: any = this.cus.getCustomerInfos();

  constructor(private cus: CustomerService) {}

  disableAccount() {
    this.cus.disableAccount().subscribe(
      (response: any) => {
        if (response.success) {
          console.log(response.success);
          this.cus.logout();
        } else {
          // Handle error response
          console.error(response.error);
        }
      },
      (error) => {
        console.error('Error disabling account:', error);
      }
    );
  }

}
