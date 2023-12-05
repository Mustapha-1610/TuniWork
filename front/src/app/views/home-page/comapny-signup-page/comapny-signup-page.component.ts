import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {  FormBuilder,  FormGroup,  FormControl,  ReactiveFormsModule,  Validators,
} from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@angular/fire/storage';

import {  ref,  uploadBytes,  getDownloadURL,  uploadBytesResumable,} from 'firebase/storage';

@Component({
  selector: 'app-comapny-signup-page',
  templateUrl: './comapny-signup-page.component.html',
  styleUrls: ['./comapny-signup-page.component.css'],
})
export class ComapnySignupPageComponent implements OnInit {
  @ViewChild('signatureCanvas') signatureCanvas!: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private previousX = 0;
  private previousY = 0;


  comapnyForm: any;
  form: any = FormGroup;
  uploadProgress: number | undefined;
  errorMessage: any = null;

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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.comapnyForm = new FormGroup({
      CompanyName: new FormControl(null),
      CompanyEmail: new FormControl(null),
      CompanyPhone: new FormControl(null),
      Password: new FormControl(null),
      CompanyWebsite: new FormControl(null),
      CompanyDescription: new FormControl(null),
      Location: new FormControl(null),
      ProfilePicture: new FormControl(null),
      CompanySignature: new FormControl(null),

    });

    this.initForm();
    this.dropdownList = this.getData();
    this.languagesList = this.getLanguages();
    this.CitiesList = this.getCities();

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
      workTitle: [null, [Validators.required]],
      languages: [null, [Validators.required]],
      cities: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
      speciality: [null],
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

  async onItemSelect($event: any) {
    console.log('$event is ', $event);
    this.specialityList = null;
    this.form.controls['speciality'].reset(); // add this line
    const workId: any = $event.item_id;
    this.http
      .post('http://localhost:5000/api/work/getSpecialities', { workId })
      .subscribe((res: any) => {
        this.specialityList = res.Specialities.map((item: any) => ({
          item_id: item._id,
          item_text: item.WorkSpeciality,
        }));
      });
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
      const signatureURL = await this.saveSignature();
      const filePath = `CompanyImages/${Date.now()}_${this.imgFile.name}`;
      const storageRef = ref(this.storage, filePath);

      // Start the upload
      const uploadTask = uploadBytesResumable(storageRef, this.imgFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          // Handle successful uploads on complete
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Update CompanySignature and ProfilePicture in comapnyForm
            this.comapnyForm.patchValue({
              CompanySignature: signatureURL,
              ProfilePicture: downloadURL,
            });

            this.uploadProgress = undefined;
            this.spinner.show();

            this.http
              .post('http://localhost:5000/api/company/create', {
                companyPersonalInfos: this.comapnyForm.value,
                companyAddedInfos: this.form.value,
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
      // Your existing logic for when there's no image file
      // ...
    }
  }


  uploadImage(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.testimg = URL.createObjectURL(file);
      this.imgFile = file;
    }
  }

  async saveSignature(): Promise<string | null> {
    const dataUrl = this.signatureCanvas.nativeElement.toDataURL('image/png');
    const blob = await this.dataURItoBlob(dataUrl);

    if (blob) {
      const filePath = `CompanyImages/${Date.now()}_signature.png`;
      const storageRef = ref(this.storage, filePath);
      try {
        const uploadTask = uploadBytes(storageRef, blob);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      } catch (error) {
        console.error('Upload failed', error);
        return null;
      }
    }
    return null;
  }

  // Helper function to convert data URL to Blob idk what the fuck is even this
  private dataURItoBlob(dataURI: string): Promise<Blob | null> {
    return new Promise((resolve) => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      resolve(blob);
    });
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    this.draw(event);
  }

  ngAfterViewInit() {
    this.context = this.signatureCanvas.nativeElement.getContext('2d');
    this.signatureCanvas.nativeElement.addEventListener('mousedown', (event) => this.startDrawing(event));
    this.signatureCanvas.nativeElement.addEventListener('mousemove', (event) => this.draw(event));
    this.signatureCanvas.nativeElement.addEventListener('mouseup', () => this.stopDrawing());
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing || !this.context) return;

    const x = event.clientX - this.signatureCanvas.nativeElement.getBoundingClientRect().left;
    const y = event.clientY - this.signatureCanvas.nativeElement.getBoundingClientRect().top;

    console.log('Drawing at:', x, y);

    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.lineCap = 'round';
    this.context.strokeStyle = 'black';

    this.context.lineTo(x, y);
    this.context.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
    this.context?.beginPath();
  }

  private clearCanvas() {
    if (this.context) {
      this.context.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
    }
  }

}
