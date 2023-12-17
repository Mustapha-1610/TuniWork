import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { Storage } from '@angular/fire/storage';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-submit-payment-request-page',
  templateUrl: './submit-payment-request-page.component.html',
  styleUrls: ['./submit-payment-request-page.component.css'],
})
export class SubmitPaymentRequestPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fs: FreelancerService,
    private storage: Storage
  ) {}
  workId: any;
  errMessage: any;
  workData: any;
  passed: any = true;
  submitted = false;
  reportForm: any = FormGroup;
  ngOnInit(): void {
    this.workId = this.route.snapshot.paramMap.get('id');
    this.getPaymentRequestPageAccess();
    this.getCompanyWorkOffer();
  }
  getPaymentRequestPageAccess() {
    this.fs
      .accessPaymentRequestPage(this.route.snapshot.paramMap.get('id'))
      .subscribe((res: any) => {
        if (res.error) {
          this.errMessage = res.error;
        }
      });
    this.reportForm = new FormGroup({
      Title: new FormControl(null),
      Description: new FormControl(null),
    });
  }
  async getCompanyWorkOffer() {
    this.fs.getWorkOfferProgress(this.workId).subscribe((res: any) => {
      this.workData = res.workOffer;
      console.log(this.workData);
      if (this.workData.DeadLine < new Date().toDateString()) {
        this.passed = false;
      }
      if (this.workData.PaymentRequest.PaymentStatus !== 'Tasks Not Done') {
        this.submitted = true;
      }
    });
  }
  sumbitRequest(workId: any) {
    const uploadTasks = [];
    for (let i = 0; i < this.images.length; i++) {
      const file = this.images[i];
      const filePath = `FreelancerImages/${Date.now()}_${file.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTasks.push(uploadTask);

      // Listen for state changes, errors, and completion of the upload for each file.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, pause, and running states here
        },
        (error) => {
          console.error('Upload failed for file: ' + file.name, error);
        },
        () => {
          console.log('Upload complete for file: ' + file.name);
        }
      );
    }

    // Use Promise.all to wait for all uploads to complete
    Promise.all(
      uploadTasks.map((task) =>
        task.then((snapshot) => getDownloadURL(snapshot.ref))
      )
    )
      .then((downloadURLs) => {
        // Here you have an array of download URLs
        console.log('All files uploaded. Download URLs:', downloadURLs);
        this.fs
          .submitPaymentRequest(workId, downloadURLs)
          .subscribe((res: any) => {
            console.log('done', res);
            if (res.workData) {
              this.workData = res.workData;
            }
          });
        // You can now do something with the download URLs, like updating the form or sending them to your backend
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  }
  images: any = null;
  uploadImage(event: any) {
    const file: FileList = event.target.files;

    if (file) {
      this.images = file;
    }
  }
  showForm: any = false;
  submitReport() {
    this.fs
      .submitPaymentReport(
        this.workData._id,
        this.reportForm.value.Title,
        this.reportForm.value.Description
      )
      .subscribe((res: any) => {
        if (res.workData) {
          this.workData = res.workData;
          this.showForm = false;
        }
      });
  }
}
