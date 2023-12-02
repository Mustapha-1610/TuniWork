import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-private-job-create',
  templateUrl: './private-job-create.component.html',
  styleUrls: ['./private-job-create.component.css'],
})
export class PrivateJobCreateComponent implements OnInit {
  privateJobCreateForm!: FormGroup;
  freelancerId: any;
  private socket: Socket;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  )
  {
    // Initialize the Socket.IO connection in the constructor
    this.socket = io('http://localhost:5000/company');
  }

  ngOnInit(): void {
    // Get freelancerId from route params
    this.route.params.subscribe((params) => {
      this.freelancerId = params['freelancerId'];
    });

    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;
    const CompanyName = companyInfos.Name;

    // Initialize form with your desired structure
    this.privateJobCreateForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Note: [''],
      ExperienceLevel: ['', Validators.required],
      FixedPrice: ['', Validators.required],
      CompanyName: CompanyName,
      DeadLine: ['', Validators.required],
      WorkTitle: [''],
      CompanyId: companyId,
      FreelancerId: [this.freelancerId, Validators.required],

    });
  }

  onSubmit(): void {
    const privateJobCreateData = this.privateJobCreateForm.value;
    console.log('Private Job Create Data:', privateJobCreateData);

    this.companyService.createPrivateJobOffer(privateJobCreateData).subscribe(
      (response: any) => {
        console.log('API Response:', response);

        const jobOfferId = response.jobOfferId;

        console.log('Job Offer ID:', jobOfferId);

        this.socket.emit('createPrivateJob', {
          freelancerId: this.freelancerId,
          jobOfferTitle: privateJobCreateData.Title,
          jobOfferId: jobOfferId,
          jobOfferCompany: privateJobCreateData.CompanyName,
        });
        console.log('Private job offer emitted');
      },
      (error) => {
        console.error('Error creating private job offer', error);
      }
    );

    this.router.navigate(['company/my-jobs']);
  }

}
