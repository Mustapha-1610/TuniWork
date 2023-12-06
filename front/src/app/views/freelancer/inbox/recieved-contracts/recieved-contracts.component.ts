import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Storage } from '@angular/fire/storage';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
@Component({
  selector: 'app-recieved-contracts',
  templateUrl: './recieved-contracts.component.html',
  styleUrls: ['./recieved-contracts.component.css'],
})
export class RecievedContractsComponent implements OnInit {
  ContractUrl: SafeResourceUrl | null = null;

  constructor(
    private fs: FreelancerService,
    private sanitizer: DomSanitizer,
    private storage: Storage
  ) {}

  freelancerInfos: any;
  CompanyContracts: any;
  showInput: any = false;
  file: any = null;
  showuploadButton: any = false;
  uploadProgress: any;
  index: any;
  ngOnInit(): void {
    this.freelancerInfos = this.fs.getFreelancerCredits();
    this.CompanyContracts = this.freelancerInfos.CompanyRecievedContracts;
    console.log(this.CompanyContracts);
  }

  setUrl(url: string) {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://docs.google.com/gview?url=${encodeURIComponent(
        url
      )}&embedded=true`
    );
    this.ContractUrl = sanitizedUrl;
    console.log(this.ContractUrl);
  }
  displayInput(id: any, index: any) {
    this.showInput = true;
    this.CompanyContracts[index].ResponseState = true;
    console.log(this.CompanyContracts);
    this.index = index;
    console.log(id);
  }
  decline(i: any) {
    this.showInput = false;
    this.CompanyContracts[i].ResponseState = false;
  }
  selectFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.file = file;
      this.showuploadButton = true;
    }
  }
  uploadPdf(id: any) {
    const filePath = `FreelancerContracts/${Date.now()}_${this.file.name}`;
    const storageRef = ref(this.storage, filePath);

    // Start the upload
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get the progress as a percentage of the total number of bytes transferred
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        this.uploadProgress = progress;
        // You can switch on the snapshot state if you want to show different statuses
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error('Upload failed', error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.file = downloadURL;
          this.fs.acceptContract(id).subscribe((res: any) => {
            if (res.freelancerAccount) {
              console.log(res);
              this.fs.setFreelancerCredits(
                JSON.stringify(res.freelancerAccount)
              );
              this.freelancerInfos = this.fs.getFreelancerCredits();
              this.CompanyContracts =
                this.freelancerInfos.CompanyRecievedContracts;
              this.showInput = false;
            }
          });
          console.log('File available at', this.file);
          this.uploadProgress = undefined;
        });
      }
    );
  }
}
