import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FreelancerlayoutComponent } from './freelancerlayout/freelancerlayout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [FreelancerlayoutComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class LayoutModule {}
