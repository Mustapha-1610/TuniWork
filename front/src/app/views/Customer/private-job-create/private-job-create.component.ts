import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service'; // Change to your customer service
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-private-job-create',
  templateUrl: './private-job-create.component.html',
  styleUrls: ['./private-job-create.component.css'],
})
export class PrivateJobCreateComponent implements OnInit {
  privateJobCreateForm!: FormGroup;
  customerId: any; 
  tasksForm: any;
  private socket: Socket;
  errMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerService: CustomerService, // Change to your customer service
    private router: Router
  ) {
    // Initialize the Socket.IO connection in the constructor
    this.socket = io('http://localhost:5000/customer'); // Change to your customer socket namespace
  }

  ngOnInit(): void {
    // Get customerId from route params
    this.route.params.subscribe((params) => {
      this.customerId = params['customerId']; 
    });

    const customerInfos: any = this.customerService.setCustomerInfos(this.privateJobCreateForm.value); // Change to your customer service method and pass the form value
    const customerId = customerInfos?._id;
    const CustomerName = customerInfos?.Name;

    // Initialize form with your desired structure
    this.privateJobCreateForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Note: [''],
      ExperienceLevel: ['', Validators.required],
      FixedPrice: ['', Validators.required],
      CustomerName: CustomerName, // Change from CompanyName to CustomerName
      DeadLine: ['', Validators.required],
      WorkTitle: [''],
      CustomerId: customerId, // Change from CompanyId to CustomerId
      FreelancerId: [this.customerId, Validators.required], // Change from FreelancerId to customerId
    });

    this.tasksForm = new FormGroup({
      Task: new FormControl(null),
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



