

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../../services/customer.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-customer-signup-page',
  templateUrl: './customer-signup-page.component.html',
  styleUrls: ['./customer-signup-page.component.css']
})
export class CustomerSignupPageComponent implements OnInit {
  customerForm: any = {};
 
  imgFile: any = null;
  CitiesList: any;

  citiesDrowdownSettings: any;

  MunicipalityDropdownSettings: any;

  errorMessage: string | undefined;
  
  emailError: string | undefined;

  passwordError: string | undefined;
  
  router: any;
  form: any = FormGroup;

  MunicipalityList: any;





  constructor(
    private customerService: CustomerService,

    private formBuilder: FormBuilder,

    private http: HttpClient,

    private spinner: NgxSpinnerService

  ) { }

  getErrorMessage(controlName: string) {
    const control = this.customerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      Name: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      Location: new FormControl('', [Validators.required]),


    });

    this.CitiesList = this.getCities();
    this.initForm();
    this.getMunicipality();
   




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
  }
  onFileSelected(event: any) {
    console.log(event);
    this.imgFile = event.target.files[0];
    console.log(this.imgFile);
  }

  initForm() {
    this.form = this.formBuilder.group({
  
      municipality: ['', Validators.required],
      cities: ['', Validators.required],


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
  }

  onItemDeselect($event: any) {
    console.log('Deselected item is ', $event);
  }






  async onCitySelect($event: any) {
    this.MunicipalityList = null;
    this.form.controls['municipality'].reset();


    const CityId = $event.item_id;
    console.log('Selected city is ', $event);
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
        this.CitiesList = response.Cities.map((item: any) => ({
          item_id: item._id,
          item_text: item.City,
        }));
      });
  }

  getMunicipality() {
    this.http
      .get('http://localhost:5000/api/city/getMunicipality')
      .subscribe((response: any) => {
        this.MunicipalityList = response.Municipality.map((item: any) => ({
          item_id: item._id,
          item_text: item.Municipality,
        }));
      });
  }

  async onSubmit() {
    console.log('Form values:', this.customerForm.value);
    console.log('Request Payload:', this.customerForm.value);
    this.spinner.show();

    console.log(this.customerForm.value);
    const formData = new FormData();
    formData.append('Name', this.customerForm.value.Name);
    formData.append('LastName', this.customerForm.value.LastName);
    formData.append('PhoneNumber', this.customerForm.value.PhoneNumber);
    formData.append('Email', this.customerForm.value.Email);
    formData.append('Password', this.customerForm.value.Password);
    //formData.append('ProfilePicture', this.imgFile);
    try {
      const response: any = await this.http.post('http://localhost:5000/api/customer/createCustomerAccount', formData).subscribe
      this.spinner.hide();
      if (response && response.error) {
        this.errorMessage = response.error;
      } else if (response && response.success) {
        this.errorMessage = response.success;
      }
    } catch (error) {
      console.error('HTTP error:', error);
    }

    this.spinner.show();
    console.log(JSON.parse(JSON.stringify(this.customerForm.value)));

    try {
      const response: any = await this.http.post('http://localhost:5000/api/customer/createCustomerAccount', {
        customerPersonalInfos: this.form.value,
        customerAccountInfos: this.customerForm.value,
      }).subscribe();
      this.spinner.hide();
      if (response && response.error) {
        this.errorMessage = response.error;
      } else {
        this.errorMessage = response?.success || 'An error occurred.';
      }
    } catch (error) {

      
      console.error('HTTP error:', error);
    }
  }

  async onCityDeselect($event: any) {
    this.MunicipalityList = null;
    this.form.controls['municipality'].reset();
    this.form.controls['cities'].reset();
  }

  async onMunicipalitySelect($event: any) {
    console.log('Selected municipality is ', $event);
  }

  async onMunicipalityDeselect($event: any) {
    console.log('Deselected municipality is ', $event);
  }

  async onItemSelect($event: any) {
    console.log('Selected item is ', $event);
  }
}