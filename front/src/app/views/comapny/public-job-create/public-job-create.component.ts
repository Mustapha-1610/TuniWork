import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-job-create',
  templateUrl: './public-job-create.component.html',
  styleUrls: ['./public-job-create.component.css']
})
export class PublicJobCreateComponent {
  publicJobOfferForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cs :CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const companyInfos = this.cs.getCompanyInfos();

    const companyId = companyInfos._id;
    const CompanyName = companyInfos.Name;
    const CompanySignature = companyInfos.Csignature;

    this.publicJobOfferForm = this.formBuilder.group({
      Title: [''],
      WorkTitle: [''],
      Description: [''],
      Note: [''],
      PayPerTask: this.formBuilder.group({
        ExperienceLevel: [''],
        FixedPrice: [''],
      }),
      WorkSpeciality: [''],
      CompanyName: CompanyName,
      CompanyId: companyId,
      CompanySignature: CompanySignature,
      DeadLine: ['', Validators.required],
      StartTime: ['', Validators.required],
    });
  }




  onSubmit(): void {
    if (this.publicJobOfferForm.valid) {
      const formData = this.publicJobOfferForm.value;
      console.log('Form Data:', formData);

      this.cs.createPublicJob(formData).subscribe(
        (response) => {
          console.log('Work offer created successfully:', response);

          // Navigate to the "my-jobs" page
          this.router.navigate(['company/my-jobs']);

          // Reset the form if needed
          this.publicJobOfferForm.reset();
        },
        (error) => {
          console.error('Error creating work offer:', error);
        }
      );
    }
  }


}
