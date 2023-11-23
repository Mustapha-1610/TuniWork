import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FreelancerService } from '../../services/freelancer.service';
import { BehaviorSubject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-freelancer-google-signup',
  templateUrl: './freelancer-google-signup.component.html',
  styleUrls: ['./freelancer-google-signup.component.css'],
})
export class FreelancerGoogleSignupComponent implements OnDestroy, OnInit {
  private dataSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private fs: FreelancerService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.dataSubscription = this.fs.data$.subscribe((data) => {
      if (data) {
        console.log(data);
        this.freelancerGoogleInofs = data;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Prevent memory leaks
      const dataSource = new BehaviorSubject<any>(null);
      this.fs.data$ = dataSource.asObservable();
    }
  }
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
  freelancerGoogleInofs: any;

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
    if (this.freelancerForm.value.PhoneNumber == null) {
      this.errorMessage = 'PhoneNumber is required';
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
    } else {
      this.freelancerForm.value.Name = this.freelancerGoogleInofs.firstName;
      this.freelancerForm.value.Surname = this.freelancerGoogleInofs.lastName;
      this.freelancerForm.value.Email = this.freelancerGoogleInofs.email;
      this.freelancerForm.value.ProfilePicture =
        this.freelancerGoogleInofs.photoUrl;
      this.spinner.show();
      console.log(JSON.parse(JSON.stringify(this.freelancerForm.value)));
      this.http
        .post('http://localhost:5000/api/freelancer/create', {
          freelancerPersonalInfos: this.freelancerForm.value,
          freelancerAddedInfos: this.form.value,
        })
        .subscribe((response: any) => {
          this.spinner.hide();
          this.errorMessage = response.error || response.success;
          if (response.freelancerAccount) {
            this.fs.setFreelancerCredits(
              JSON.stringify(response.freelancerAccount)
            );
            this.router.navigate(['/freelancer/profile']);
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
