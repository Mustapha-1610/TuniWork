import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FreelancerService } from '../../services/freelancer.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@angular/fire/storage';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
@Component({
  selector: 'app-freelancer-signup-page',
  templateUrl: './freelancer-signup-page.component.html',
  styleUrls: ['./freelancer-signup-page.component.css'],
})
export class FreelancerSignupPageComponent implements OnInit {
  dropdownList: any;
  dropdownSettings: any;
  dropdownSettings2: any;
  dropdownSettings3: any;
  specialityList: any;
  languagesList: any;
  freelancerForm: any;
  form: any = FormGroup;
  errorMessage: any = null;
  imageUrl: string | null = null;
  testimg: string =
    'https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38';
  imgFile: any = null;
  uploadProgress: number | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.freelancerForm = new FormGroup({
      Name: new FormControl(null),
      Surname: new FormControl(null),
      PhoneNumber: new FormControl(null),
      Email: new FormControl(null),
      Password: new FormControl(null),
      HourlyRate: new FormControl(null),
      PayPerTaskRate: new FormControl(null),
      EstimateWorkLocation: new FormControl(null),
      ProfilePicture: new FormControl(null),
    });
    this.initForm();
    this.dropdownList = this.getData();
    this.languagesList = this.getLanguages();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.dropdownSettings3 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
  }

  initForm() {
    this.form = this.formBuilder.group({
      workTitle: [null, [Validators.required]],
      speciality: [null, [Validators.required]], // add this line
      languages: [null, [Validators.required]], // add this line
    });
  }
  onSpecialitySelect($event: any) {
    console.log('Selected speciality is ', $event);
  }

  onSpecialityDeselect($event: any) {
    console.log('Deselected speciality is ', $event);
  }

  handleButtonClick() {
    console.log(
      'reactive form value ',
      JSON.parse(JSON.stringify(this.form.value))
    );
    console.log(
      'Actual data ',
      this.dropdownList.filter((item: any) =>
        this.form.value.workTitle.includes(item.item_id)
      )
    );
  }

  onItemDeselect($event: any) {
    console.log('Deselected item is ', $event);
  }

  async onItemSelect($event: any) {
    console.log('$event is ', $event);
    this.specialityList = null;
    this.form.controls['speciality'].reset(); // add this line
    const workId: any = $event.item_id;
    this.http
      .post('http://localhost:5000/api/work/getSpecialities', { workId })
      .subscribe((response: any) => {
        const res: any = response;
        this.specialityList = res.Specialities.map((item: any) => ({
          item_id: item._id,
          item_text: item.WorkSpeciality,
        }));
      });
  }

  getData(): void {
    this.http
      .get('http://localhost:5000/api/work/getWorkData')
      .subscribe((response: any) => {
        this.dropdownList = response.workData.map((item: any) => ({
          item_id: item._id,
          item_text: item.WorkTitle,
        }));
        // Set default selection after data is fetched
      });
  }
  getLanguages(): void {
    this.http
      .post('http://localhost:5000/api/languages/getAll', {
        languageId: '6540c24d319096ca5cd835cd',
      })
      .subscribe((response: any) => {
        this.languagesList = response.languageTable.Languages.map(
          (language: string, index: number) => ({
            item_id: index,
            item_text: language,
          })
        );
        // Set default selection after data is fetched
      });
  }

  async test() {
    if (
      this.freelancerForm.value.Name == null ||
      this.freelancerForm.value.Name.trim() === ''
    ) {
      this.errorMessage = 'Name is required';
    } else if (
      this.freelancerForm.value.Surname == null ||
      this.freelancerForm.value.Surname.trim() === ''
    ) {
      this.errorMessage = 'Surname is required';
    } else if (this.freelancerForm.value.PhoneNumber == null) {
      this.errorMessage = 'PhoneNumber is required';
    } else if (
      this.freelancerForm.value.Email == null ||
      this.freelancerForm.value.Email.trim() === ''
    ) {
      this.errorMessage = 'Email is required';
    } else if (
      this.freelancerForm.value.Password == null ||
      this.freelancerForm.value.Password.trim() === ''
    ) {
      this.errorMessage = 'Password is required';
    } else if (this.freelancerForm.value.HourlyRate == null) {
      this.errorMessage = 'Hourly Rate is required';
    } else if (this.freelancerForm.value.PayPerTaskRate == null) {
      this.errorMessage = 'Pay Per Task Rate is required';
    } else if (
      this.freelancerForm.value.EstimateWorkLocation == null ||
      this.freelancerForm.value.EstimateWorkLocation.trim() === ''
    ) {
      this.errorMessage = 'Estimate Work Location is required';
    } else if (this.form.value.workTitle == null) {
      this.errorMessage = 'Work Title is required';
    } else if (this.form.value.speciality == null) {
      this.errorMessage = 'Speciality is required';
    } else if (this.form.value.languages == null) {
      this.errorMessage = 'Languages Are required';
    } else if (this.imgFile) {
      const filePath = `FreelancerImages/${Date.now()}_${this.imgFile.name}`;
      const storageRef = ref(this.storage, filePath);

      // Start the upload
      const uploadTask = uploadBytesResumable(storageRef, this.imgFile);

      // Listen for state changes, errors, and completion of the upload.
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
            this.imageUrl = downloadURL;
            console.log('File available at', this.imageUrl);
            this.freelancerForm.value.ProfilePicture = this.imageUrl;
            this.uploadProgress = undefined;
            console.log(this.freelancerForm.value);
            this.spinner.show();
            console.log(JSON.parse(JSON.stringify(this.freelancerForm.value)));
            this.http
              .post('http://localhost:5000/api/freelancer/create', {
                freelancerPersonalInfos: this.freelancerForm.value,
                freelancerAddedInfos: this.form.value,
              })
              .subscribe((response: any) => {
                this.spinner.hide();
                if (response.error) {
                  this.errorMessage = response.error;
                } else {
                  this.errorMessage = response.success;
                }
              });
          });
        }
      );
    } else {
      this.spinner.show();
      console.log(JSON.parse(JSON.stringify(this.freelancerForm.value)));
      this.http
        .post('http://localhost:5000/api/freelancer/create', {
          freelancerPersonalInfos: this.freelancerForm.value,
          freelancerAddedInfos: this.form.value,
        })
        .subscribe((response: any) => {
          this.spinner.hide();
          if (response.error) {
            this.errorMessage = response.error;
          } else {
            this.errorMessage = response.success;
          }
        });
    }
  }
  async uploadImage(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.testimg = URL.createObjectURL(file);
      this.imgFile = file;
    }
  }
}
