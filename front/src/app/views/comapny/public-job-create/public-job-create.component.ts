import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-public-job-create',
  templateUrl: './public-job-create.component.html',
  styleUrls: ['./public-job-create.component.css'],
})
export class PublicJobCreateComponent {
  publicJobOfferForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cs: CompanyService,
    private router: Router,
    private fs: FreelancerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.citiesDrowdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.MunicipalityDropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.WorkTitleSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.SpecialitySettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.CitiesList = this.getCities();
    this.initForm2();
    this.WorkTitleList = this.getData();
  }

  private initForm(): void {
    const companyInfos = this.cs.getCompanyInfos();

    const companyId = companyInfos._id;
    const CompanyName = companyInfos.Name;
    const CompanySignature = companyInfos.Csignature;

    this.publicJobOfferForm = this.formBuilder.group({
      Title: [''],
      WorkTitle: [''],
      Description: [''],
      Note: [''],
      PayPerTask: this.formBuilder.group({
        ExperienceLevel: [''],
        FixedPrice: [''],
      }),
      WorkSpeciality: [''],
      CompanyName: CompanyName,
      CompanyId: companyId,
      CompanySignature: CompanySignature,
      DeadLine: ['', Validators.required],
      StartTime: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.publicJobOfferForm.valid) {
      const formData = this.publicJobOfferForm.value;
      const cityData = this.form.value;
      console.log('Form Data:', formData);

      this.cs.createPublicJob(formData, cityData).subscribe(
        (response) => {
          console.log('Work offer created successfully:', response);

          // Navigate to the "my-jobs" page
          this.router.navigate(['company/my-jobs']);

          // Reset the form if needed
          this.publicJobOfferForm.reset();
        },
        (error) => {
          console.error('Error creating work offer:', error);
        }
      );
    }
  }

  // (Mustapha)
  //
  citiesDrowdownSettings: any;
  MunicipalityList: any;
  MunicipalityDropdownSettings: any;
  CitiesList: any;
  WorkTitleSettings: any;
  WorkTitleList: any;
  SpecialitySettings: any;
  SpecialityList: any;
  form: any = FormGroup;
  initForm2() {
    this.form = this.formBuilder.group({
      cities: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
      workTitles: [null, [Validators.required]],
      specialities: [null, [Validators.required]],
    });
  }
  onSpecialitySelect($event: any) {
    console.log('Selected speciality is ', $event);
  }

  onSpecialityDeselect($event: any) {
    console.log('Deselected speciality is ', $event);
  }
  onCityDeselect($event: any) {
    this.form.controls['municipality'].reset();
  }
  onItemDeselect($event: any) {
    console.log('Deselected item is ', $event);
  }
  async onCitySelect($event: any) {
    this.MunicipalityList = null;
    this.form.controls['municipality'].reset();
    const CityId = $event.item_id;
    console.log($event.item_text);
    this.http
      .post('http://localhost:5000/api/city/getMunicipality', { CityId })
      .subscribe((res: any) => {
        this.MunicipalityList = res.Municipality.map(
          (Municipality: string, index: number) => ({
            item_id: index,
            item_text: Municipality,
          })
        );
      });
  }
  getCities() {
    this.http
      .get('http://localhost:5000/api/city/getAll')
      .subscribe((response: any) => {
        console.log(response);
        this.CitiesList = response.Cities.map((item: any) => ({
          item_id: item._id,
          item_text: item.City,
        }));
        // Set default selection after data is fetched
      });
  }
  getData(): void {
    this.http
      .get('http://localhost:5000/api/work/getWorkData')
      .subscribe((response: any) => {
        this.WorkTitleList = response.workData.map((item: any) => ({
          item_id: item._id,
          item_text: item.WorkTitle,
        }));
        // Set default selection after data is fetched
      });
  }
  async onItemSelect($event: any) {
    console.log('$event is ', $event);
    this.SpecialityList = null;
    this.form.controls['specialities'].reset(); // add this line
    const workId: any = $event.item_id;
    this.http
      .post('http://localhost:5000/api/work/getSpecialities', { workId })
      .subscribe((res: any) => {
        this.SpecialityList = res.Specialities.map((item: any) => ({
          item_id: item._id,
          item_text: item.WorkSpeciality,
        }));
      });
  }
}
