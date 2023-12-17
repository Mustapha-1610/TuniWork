import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../../services/customer.service';
import { throwError } from 'rxjs';
import { Storage } from '@angular/fire/storage';
import {  ref,  getDownloadURL,  uploadBytesResumable,} from 'firebase/storage';

@Component({
  selector: 'app-customer-signup-page',
  templateUrl: './customer-signup-page.component.html',
  styleUrls: ['./customer-signup-page.component.css']
})
export class CustomerSignupPageComponent {
  customerForm: any;
  form: any = FormGroup;
  uploadProgress: number | undefined;
  errorMessage: string | undefined;


  fileInput: any;

  dropdownList: any;
  dropdownSettings: any;
  dropdownSettings2: any;
  dropdownSettings3: any;

  citiesDrowdownSettings: any;

  MunicipalityDropdownSettings: any;



  MunicipalityList: any;
  specialityList: any;
  languagesList: any;
  CitiesList: any;
  imageUrl: string | null = null;
  testimg: string = 'https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38';
  imgFile: any = null;


  testSig: string = ''


  emailError: string | undefined;

  passwordError: string | undefined;

  router: any;








  constructor(


    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private storage: Storage

  ) { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      Name:  new FormControl(null),
      LastName:  new FormControl(null),
      PhoneNumber:  new FormControl(null),
      Email:  new FormControl(null),
      Password:  new FormControl(null),
      Location:  new FormControl(null),
      ProfilePicture: new FormControl(null),


    });


    this.initForm();
    this.CitiesList = this.getCities();


  


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
      languages: [null, [Validators.required]],
    
    });
  }






  getErrorMessage(controlName: string) {
    const control = this.customerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
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

  async onCitySelect($event: any) {
    this.MunicipalityList = null;
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
        // Set default selection after data is fetched
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
        // Set default selection after data is fetched
      });
  }



  async test() {
    if (this.imgFile) {
      const filePath = `CustomerImages/${Date.now()}_${this.imgFile.name}`;
      const storageRef = ref(this.storage, filePath);

      const uploadTask = uploadBytesResumable(storageRef, this.imgFile);

      uploadTask.on(
        'state_changed',
        (snapshot: { bytesTransferred: number; totalBytes: number; state: any; }) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        async () => {
        
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            
            this.customerForm.patchValue({
              ProfilePicture: downloadURL,
            });

            this.uploadProgress = undefined;
            this.spinner.show();

            this.http
              .post('http://localhost:5000/api/customer/createCustomerAccount ', {
                customerPersonalInfos: this.customerForm.value,
                customerAddedInfos: this.form.value,
              })
              .subscribe((response: any) => {
                this.spinner.hide();
                if (response.error) {
                  this.errorMessage = response.error;
                } else {
                  this.errorMessage = response.success;
                }
              });
          } catch (err) {
            console.error('Error getting download URL', err);
          }
        }
      );
    } else {

    }
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.testimg = URL.createObjectURL(file);
      this.imgFile = file;
    }
  }
}




