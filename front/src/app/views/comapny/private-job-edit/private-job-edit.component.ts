// private-job-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-private-job-edit',
  templateUrl: './private-job-edit.component.html',
  styleUrls: ['./private-job-edit.component.css']
})
export class PrivateJobEditComponent implements OnInit {
  privateJobOffer: any;
  privateJobEditForm!: FormGroup;

  constructor(
    private cs: CompanyService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form group with any necessary validators
    this.privateJobEditForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Note: [''],
      PayPerTask: ['', Validators.required],
      PayPerHour: ['', Validators.required],
      CompanyName: ['', Validators.required],
      CompanyLocation: [''],
      TotalWorkOfferd: ['', Validators.required],
      TotalMoneyPayed: ['', Validators.required],
    });

    // Fetch the private job offer ID from the route parameters
    const privateJobOfferId = this.route.snapshot.params['privateJobOfferId'];

    // Fetch the private job offer data based on the ID
    this.fetchPrivateJobOffer(privateJobOfferId);
  }

  fetchPrivateJobOffer(privateJobOfferId: string): void {
    this.cs.getPrivateJobOfferDetails(privateJobOfferId).subscribe(
      (response: any) => {
        this.privateJobOffer = response;
        // patch the form with the fetched data
        this.privateJobEditForm.patchValue({
          Title: this.privateJobOffer.Title,
          Description: this.privateJobOffer.Description,
          Note: this.privateJobOffer.Note,
          PayPerTask: this.privateJobOffer.PaymentMethod.PayPerTask,
          PayPerHour: this.privateJobOffer.PaymentMethod.PayPerHour,
          CompanyName: this.privateJobOffer.CompanyName,
          CompanyLocation: this.privateJobOffer.CompanyLocation,
          TotalWorkOfferd: this.privateJobOffer.TotalWorkOfferd,
          TotalMoneyPayed: this.privateJobOffer.TotalMoneyPayed,
        });
      },
      (error) => {
        console.error('Error fetching private job offer', error);
      }
    );
  }



  

  onSubmit(): void {
    const privateJobOfferId = this.privateJobOffer?._id;

    if (!privateJobOfferId) {
      console.error('Private job offer ID not found');
      return;
    }

    const updatedJobOfferData = this.privateJobEditForm.value;

    this.cs.editPrivateJobOffer(privateJobOfferId, updatedJobOfferData).subscribe(
      (response: any) => {
        console.log(response.success);
        //to add l route li hajti bih later
      },
      (error) => {
        console.error('Error editing private job offer', error);
      }
    );
  }
}
