import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-private-job-create',
  templateUrl: './private-job-create.component.html',
  styleUrls: ['./private-job-create.component.css']
})
export class PrivateJobCreateComponent implements OnInit{
  privateJobCreateForm!: FormGroup;
  freelancerId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService, private router: Router) {}
  ngOnInit(): void {
    // Get freelancerId from route params
    this.route.params.subscribe((params) => {
      this.freelancerId = params['freelancerId'];
    });


  this.privateJobCreateForm = this.formBuilder.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    Note: [''],
    ExperienceLevel: ['', Validators.required],
    FixedPrice: ['', Validators.required],
  
    DeadLine: ['', Validators.required],
    WorkTitle: [''],
    CustomerId: [''],
    FreelancerId: [this.freelancerId, Validators.required],

  });
}
  
onSubmit(): void {
  const privateJobCreateData = this.privateJobCreateForm.value;

  this.customerService.createPrivateJobOffer(privateJobCreateData).subscribe(
    (response: any) => {
      console.log(response.success);
    },
    (error) => {
      console.error('Error creating private job offer', error);
    }
  );
  this.router.navigate(['customer/my-jobs']);

}
}



