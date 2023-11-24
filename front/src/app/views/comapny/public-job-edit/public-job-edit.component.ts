// public-job-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-public-job-edit-form',
  templateUrl: './public-job-edit.component.html',
  styleUrls: ['./public-job-edit.component.css']
})
export class PublicJobEditFormComponent implements OnInit {

  publicJobOfferForm: FormGroup;
  publicJobId: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) {
    this.publicJobOfferForm = this.fb.group({
      Title: ['', Validators.required],
      WorkTitle: [''],
      Description: ['', Validators.required],
      Note: [''],
      PayPerTask: this.fb.group({
        ExperienceLevel: [''],
        FixedPrice: ['']
      }),
      WorkSpeciality: ['', Validators.required],
      CompanyName: ['', Validators.required],
      CompanyId: ['', Validators.required]
    });

    // Retrieve the job offer ID from the route parameters
    this.route.params.subscribe(params => {
      this.publicJobId = params['jobOfferId'];

      // Fetch job offer details and populate the form
      this.companyService.getPublicJobDetails(this.publicJobId).subscribe(
        (response: any) => {
          this.populateForm(response);
        },
        (error) => {
          console.error('Error fetching public job details', error);
        }
      );
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const updatedData = this.publicJobOfferForm.value;

    this.companyService.editPublicJob(this.publicJobId, updatedData).subscribe(
      (response: any) => {
        console.log(response.success);
        this.router.navigate(['/my-jobs']);
      },
      (error) => {
        console.error('Error editing public job offer', error);
      }
    );
  }

  private populateForm(data: any): void {
    this.publicJobOfferForm.patchValue({
      Title: data.Title,
      WorkTitle: data.WorkTitle,
      Description: data.Description,
      Note: data.Note,
      PayPerTask: {
        ExperienceLevel: data.PayPerTask.ExperienceLevel,
        FixedPrice: data.PayPerTask.FixedPrice,
      },
      WorkSpeciality: data.WorkSpeciality,
      CompanyName: data.CompanyName,
      CompanyId: data.CompanyId,
    });
  }
}
