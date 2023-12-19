import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css',
'../../../../assets/sideBar/style.css'],
})
export class ProfilePageComponent {
  companyData: any = this.cs.getCompanyInfos();

  constructor(private cs: CompanyService) {}

  disableAccount() {
    this.cs.disableAccount().subscribe(
      (response: any) => {
        if (response.success) {
          console.log(response.success);
          this.cs.logout();
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
