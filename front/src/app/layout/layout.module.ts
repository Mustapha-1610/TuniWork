import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerlayoutComponent } from './freelancerlayout/freelancerlayout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { CompanyLayoutComponent } from './company-layout/company-layout.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';

@NgModule({
  declarations: [
    FreelancerlayoutComponent,
    HomeLayoutComponent,
    CompanyLayoutComponent,
    CustomerLayoutComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class LayoutModule {}
