import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerlayoutComponent } from './layout/freelancerlayout/freelancerlayout.component';

const routes: Routes = [
  {
    path: 'freelancer',
    component: FreelancerlayoutComponent,
    children: [
      {
        path: 'signup',
        loadChildren: () =>
          import('./views/freelancer/signup/signup-routing.module').then(
            (m) => m.SignupRoutingModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/freelancer/login/login-routing.module').then(
            (m) => m.LoginRoutingModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/freelancer/profile/profile-routing.module').then(
            (m) => m.ProfileRoutingModule
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
