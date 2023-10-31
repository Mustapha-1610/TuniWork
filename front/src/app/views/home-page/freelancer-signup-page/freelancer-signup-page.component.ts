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
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService
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
