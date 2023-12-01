import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-public-job-create',
  templateUrl: './public-job-create.component.html',
  styleUrls: ['./public-job-create.component.css']
})
export class PublicJobCreateComponent {
  publicJobOfferForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private cs :CompanyService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
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
      CompanyName: [''],
      CompanyId: [''],
    });
  }


onSubmit(): void {
  if (this.publicJobOfferForm.valid) {
    const formData = this.publicJobOfferForm.value;
    console.log('Form Data:', formData);

    this.cs.createPublicJob(formData).subscribe(
      (response) => {
        console.log('Work offer created successfully:', response);
        // gedi l route
        this.publicJobOfferForm.reset();
      },
      (error) => {
        console.error('Error creating work offer:', error);
      }
    );
  }
}

}
