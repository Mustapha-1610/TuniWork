import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyWorkPageComponent } from './my-work-page/my-work-page.component';
import { FindWorkPageComponent } from './find-work-page/find-work-page.component';
import { WorkInformationsPageComponent } from './work-informations-page/work-informations-page.component';
import { EditInfosPageComponent } from './edit-infos-page/edit-infos-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent,
    MyWorkPageComponent,
    FindWorkPageComponent,
    WorkInformationsPageComponent,
    EditInfosPageComponent,
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
