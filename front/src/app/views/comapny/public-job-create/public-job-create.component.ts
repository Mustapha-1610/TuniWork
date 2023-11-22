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
      CompanyName: [''], // Assuming this is also a FormControl
      CompanyId: [''], // Assuming this is also a FormControl
    });
  }


  // public-job-create.component.ts

onSubmit(): void {
  if (this.publicJobOfferForm.valid) {
    const formData = this.publicJobOfferForm.value;
    console.log('Form Data:', formData);

    // Call the service function here
    this.cs.createPublicJob(formData).subscribe(
      (response) => {
        console.log('Work offer created successfully:', response);
        // Optionally, you can reset the form or navigate to another page
        this.publicJobOfferForm.reset();
      },
      (error) => {
        console.error('Error creating work offer:', error);
        // Handle error as needed
      }
    );
  } else {
    // Form is invalid, show error messages or handle accordingly
  }
}

}
