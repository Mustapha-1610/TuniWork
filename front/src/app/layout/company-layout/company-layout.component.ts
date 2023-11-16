import { Component } from '@angular/core';
import { CompanyService } from 'src/app/views/services/company.service';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.css'],
})
export class CompanyLayoutComponent {
  constructor(private cs: CompanyService) {}
  logout() {
    this.cs.logout();
  }
}
