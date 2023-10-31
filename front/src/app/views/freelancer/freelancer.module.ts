import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    FreelancerRoutingModule,

    ReactiveFormsModule,
  ],
})
export class FreelancerModule {}
