import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-signup-page',
  templateUrl: './customer-signup-page.component.html',
  styleUrls: ['./customer-signup-page.component.css']
})
export class CustomerSignupPageComponent implements OnInit {
  customerForm: any={};
  testimg: string =
  'https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38';
imgFile: any = null;
CitiesList: any;
citiesDrowdownSettings: any;
MunicipalityDropdownSettings: any;
errorMessage: string | undefined;
emailError: string | undefined;
passwordError: string | undefined;
router: any;
form: any = FormGroup;
specialityList: any ;
MunicipalityList: any ;
  
  
  


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService  
  ) {}

  getErrorMessage(controlName: string) {
    const control = this.customerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

  ngOnInit() {
    this.customerForm = new FormGroup({
      Name: new FormControl(null),
      LastName: new FormControl(null),
      PhoneNumber: new FormControl(null),
      Email: new FormControl(null),
      Password: new FormControl(null),
      ProfilePicture: new FormControl(null),
      Location: new FormControl(null),
      })
    
    this.initForm();
   
    this.CitiesList = this.getCities();
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
  }

  initForm() {
    this.form = this.formBuilder.group({  
      cities: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
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
    this.form.controls['municipality'].reset();
    const CityId = $event.item_id;
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





  

  async onSubmit() {
    console.log('Button clicked!');
    console.log('Form values:', this.customerForm.value);
    console.log('Request Payload:', this.customerForm.value);

  
      console.log(this.customerForm.value);
      console.log('Form values:', this.customerForm.value);

      this.spinner.show();
      console.log(JSON.parse(JSON.stringify(this.customerForm.value)));
      this.http
        .post('http://localhost:5000/api/customer/createCustomerAccount', {
          customerPersonalInfos: this.customerForm.value,
        })
        .subscribe((response: any) => {
          this.spinner.hide();
          if (response.error) {
            this.errorMessage = response.error;
          } else {
            this.errorMessage = response.success;
            

          }
        });
  
      // Additional logic for other conditions can be added here
      this.spinner.show();
      console.log(JSON.parse(JSON.stringify(this.customerForm.value)));
      this.http
        .post('http://localhost:5000/api/customer/createCustomerAccount', {
          customerPersonalInfos: this.form.value,
        })
        .subscribe((response: any) => {
          this.spinner.hide();
          if (response.error) {
            this.errorMessage = response.error;
          } else {
            this.errorMessage = response.success;
          }
          (error: any) => {
            console.error('HTTP error:', error);
            // Handle error
          }   
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
  
  

}