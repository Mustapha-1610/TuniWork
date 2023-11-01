import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerlayoutComponent } from './layout/freelancerlayout/freelancerlayout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { FreelancerGuardGuard } from './views/guards/freelancer-guard.guard';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
