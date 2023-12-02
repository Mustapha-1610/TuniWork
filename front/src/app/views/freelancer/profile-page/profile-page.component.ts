import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { Storage } from '@angular/fire/storage';
import { CalendarEvent } from 'angular-calendar';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  freeLancerInfos: any = JSON.parse(localStorage.getItem('freeLancerInfos')!);
  imageUrl: string | null = null;
  imgFile: any = null;
  uploadProgress: number | undefined;
  testimg: any;
  show: any = false;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  ngOnInit() {
    this.http
      .get('http://localhost:5000/api/freelancer/getDate')
      .subscribe((res: any) => {
        console.log(res);
        this.events = res.schedule.map((date: any) => {
          return {
            start: new Date(date),
            title: 'Booked',
            color: {
              primary: '#ad2121', // Event color (example)
              secondary: '#FAE3E3', // Event background color (example)
            },
          };
        });
      });
  }

  handleEventClick({ event }: { event: CalendarEvent }): void {
    console.log(event.meta.tpl);
  }
  constructor(
    private router: Router,
    private fs: FreelancerService,
    private storage: Storage,
    private http: HttpClient
  ) {}
  ngOnDestroy() {}

  changeProfilePicture() {
    if (this.imgFile) {
      const filePath = `FreelancerImages/${Date.now()}_${this.imgFile.name}`;
      const storageRef = ref(this.storage, filePath);

      const uploadTask = uploadBytesResumable(storageRef, this.imgFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.uploadProgress = progress;
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.imageUrl = downloadURL;
            console.log('File available at', this.imageUrl);
            this.fs.updatePP(this.imageUrl).subscribe((res: any) => {
              if (res.freelancerAccount) {
                this.fs.setFreelancerCredits(
                  JSON.stringify(res.freelancerAccount)
                );
                this.freeLancerInfos = this.fs.getFreelancerCredits();
                this.show = false;
              }
            });
            this.uploadProgress = undefined;
          });
        }
      );
    }
  }
  cancel() {
    this.freeLancerInfos = this.fs.getFreelancerCredits();
    this.show = false;
  }
  uploadImage(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log('hello');
      this.freeLancerInfos.ProfilePicture = URL.createObjectURL(file);
      this.imgFile = file;
      this.show = true;
    }
  }
  isEditing = false;
  editableName = `${this.freeLancerInfos.Name}`;

  saveName() {
    const names = this.editableName.split(' ');
    this.freeLancerInfos.Name = names[0];
    // Here you would typically send the updated name to the server
  }
}
