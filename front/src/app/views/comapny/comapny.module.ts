import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComapnyRoutingModule } from './comapny-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    ProfilePageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ComapnyRoutingModule
  ]
})
export class ComapnyModule { }
