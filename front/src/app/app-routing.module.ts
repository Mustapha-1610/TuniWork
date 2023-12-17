import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerlayoutComponent } from './layout/freelancerlayout/freelancerlayout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { FreelancerGuardGuard } from './views/guards/freelancer-guard.guard';
import { homePageGuard } from './views/guards/home-page.guard';
import { CompanyLayoutComponent } from './layout/company-layout/company-layout.component';
import { companyLayoutGuard } from './views/guards/company-layout.guard';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { customerGuard } from './views/guards/customer.guard';

const routes: Routes = [
  {
    path: 'freelancer',
    component: FreelancerlayoutComponent,
    canActivate: [FreelancerGuardGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/freelancer/freelancer-routing.module').then(
            (m) => m.FreelancerRoutingModule
          ),
      },
    ],
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [homePageGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/home-page/home-page-routing.module').then(
            (m) => m.HomePageRoutingModule
          ),
      },
    ],
  },
  {
    path: 'company',
    component: CompanyLayoutComponent,
    canActivate: [companyLayoutGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/comapny/comapny-routing.module').then(
            (m) => m.ComapnyRoutingModule
          ),
      },
    ],
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    canActivate: [customerGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/Customer/customer-routing.module').then(
            (m) => m.CustomerRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
