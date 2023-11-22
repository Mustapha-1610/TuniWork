import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PublicJobCreateComponent } from './public-job-create/public-job-create.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'public-job-create',
    component: PublicJobCreateComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
  ],

  exports: [RouterModule],
})
export class ComapnyRoutingModule {}
