import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { io, Socket } from 'socket.io-client';
import { FreelancerService } from '../../services/freelancer.service';

@Component({
  selector: 'app-private-job-create',
  templateUrl: './private-job-create.component.html',
  styleUrls: ['./private-job-create.component.css'],
})
export class PrivateJobCreateComponent implements OnInit {
  privateJobCreateForm!: FormGroup;
  freelancerId: any;
  freelancerName: any;
  freelancerWorktitle: any;
  freelancerPPH: any;
  freelancerPPT:any;
  tasksForm: any;
  private socket: Socket;
  errMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router
  ) {
    // Initialize the Socket.IO connection in the constructor
    this.socket = io('http://localhost:5000/company');
  }

  ngOnInit(): void {
    // Get freelancerId from route params
    this.route.params.subscribe((params) => {
      this.freelancerId = params['freelancerId'];

      this.viewFreelancerDetails(this.freelancerId);
    });

    const companyInfos = this.companyService.getCompanyInfos();
    const companyId = companyInfos._id;
    const CompanyName = companyInfos.Name;

  
    this.privateJobCreateForm = this.formBuilder.group({
      Title: ['', Validators.required],
      CompanyName: CompanyName,
      Description: ['', Validators.required],
      Note: [''],
      PayPerHour: [false],
      PayPerTask: [false],
      DeadLine: ['', Validators.required],
      WorkTitle: [''],
      CompanyId: companyId,
      FreelancerId: [this.freelancerId, Validators.required],
      StartTime: ['', Validators.required],
    });

    this.tasksForm = new FormGroup({
      Task: new FormControl(null),
    });

  this.privateJobCreateForm.addControl('PayPerHour', new FormControl(false));
  this.privateJobCreateForm.addControl('PayPerTask', new FormControl(false));

  this.privateJobCreateForm.patchValue({
    PayPerHour: false,
    PayPerTask: false,
  });
  }

  viewFreelancerDetails(freelancerId: string): void {
    this.companyService.getFreelancerDetails(freelancerId).subscribe(
      (response: any) => {
        const freelancerDetails = response.freelancer;
        const Name = freelancerDetails.Name;
        const PayPerHour = freelancerDetails.PayRate.HourlyRate;
        const PayPerTask = freelancerDetails.PayRate.PayPerTaskRate;
        const Worktitle = freelancerDetails.WorkTitle.WorkTitleText;

        this.freelancerName = Name;
        this.freelancerWorktitle = Worktitle;
        this.freelancerPPH =PayPerHour;
        this.freelancerPPT=PayPerTask

      this.privateJobCreateForm.get('PayPerHour')?.setValue(PayPerHour);
      this.privateJobCreateForm.get('PayPerTask')?.setValue(PayPerTask);

        console.log('Freelancer Details:', freelancerDetails);
      },
      (error) => {
        console.error('Error getting freelancer details', error);
      }
    );
  }


  onSubmit(): void {
    if (this.taskTable.length === 0) {
      this.errMessage = 'You Need To Add Atleast One Task';
    } else {
      const privateJobCreateData = this.privateJobCreateForm.value;

      privateJobCreateData.PayRate = {};
      if (this.privateJobCreateForm.get('PayPerHour')?.value) {
        privateJobCreateData.PayRate.PayPerHour = +this.freelancerPPH;
      } else if (this.privateJobCreateForm.get('PayPerTask')?.value) {
        privateJobCreateData.PayRate.PayPerTask = +this.freelancerPPT;
      }

      console.log('Private Job Create Data:', privateJobCreateData);

      this.companyService.createPrivateJobOffer(privateJobCreateData, this.taskTable).subscribe(
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




  // (Mustapha)
  taskTable: any[] = [];
  addToTaskList() {
    if (this.tasksForm.value.Task.trim() === '') {
    } else {
      this.errMessage = null;
      this.taskTable.push(this.tasksForm.value.Task);
      this.tasksForm.controls['Task'].reset();
    }
  }
  deleteItem(item: any) {
    this.taskTable = this.taskTable.filter((task) => task !== item);
    if (this.taskTable.length === 0) {
      this.errMessage = 'You Need To Add Atleast One Task';
    }
  }
}
