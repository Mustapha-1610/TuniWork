import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-best-matches-component',
  templateUrl: './best-matches-component.component.html',
  styleUrls: ['./best-matches-component.component.css'],
})
export class BestMatchesComponentComponent implements OnInit {
  constructor(
    private fs: FreelancerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.getMatchingWorkOffers();
    this.citiesDrowdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.MunicipalityDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
    };
    this.initForm();
    this.CitiesList = this.getCities();
  }
  freeLancerInfos: any = this.fs.getFreelancerCredits();
  MatchingJobs: any;
  errMessage: any;
  publicWorkOfferInfos: any;
  showCancel: boolean = false;
  Speciality: any = null;
  getMatchingWorkOffers() {
    this.fs
      .getBestMatchingWO(this.freeLancerInfos._id)
      .subscribe((res: any) => {
        console.log('hello' + res);
        this.MatchingJobs = res.matchingJobOffers;
      });
  }
  CheckOffre(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WorkOffer', id]);
  }
  PWOApply(id: any) {
    this.fs.applyPWO(this.freeLancerInfos._id, id).subscribe((res: any) => {
      this.errMessage = res.success || res.error;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.freeLancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferApplyed(id);
      }
    });
  }
  PWOUnapply(PWOId: any) {
    this.fs
      .unapplyPWO(this.freeLancerInfos._id, PWOId)
      .subscribe((res: any) => {
        this.errMessage = res.error || res.success;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
          this.freeLancerInfos = this.fs.getFreelancerCredits();
          this.isWorkOfferApplyed(PWOId);
        }
      });
  }
  SavePWO(PWOId: any, PWOTitle: any, PWODescription: any) {
    this.fs
      .savePWO(this.freeLancerInfos._id, PWOId, PWOTitle, PWODescription)
      .subscribe((res: any) => {
        console.log(res.success);
        this.errMessage = res.success || res.error;
        if (res.freeLancerAccount) {
          this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));

          // Update your FreelancerInfos with the information from the response
          this.freeLancerInfos = this.fs.getFreelancerCredits();

          // Optionally, you can force Angular to check for changes
          this.isWorkOfferSaved(PWOId); // You need to inject ChangeDetectorRef in the constructor
        }
      });
  }
  unsavePwo(PWOId: any) {
    this.fs.unsavePwo(this.freeLancerInfos._id, PWOId).subscribe((res: any) => {
      this.errMessage = res.error || res.success;
      if (res.freeLancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freeLancerAccount));
        this.freeLancerInfos = this.fs.getFreelancerCredits();
        this.isWorkOfferSaved(PWOId);
      }
    });
  }
  isWorkOfferSaved(workOfferId: any): boolean {
    return this.freeLancerInfos?.SavedWorkOffers?.some(
      (offer: any) => offer.WorkId === workOfferId
    );
  }
  isWorkOfferApplyed(workOfferId: any) {
    return this.freeLancerInfos?.PendingWorkOffers?.some(
      (pendingOffer: any) => pendingOffer.PublicJobOfferId === workOfferId
    );
  }
  getOptionValue(event: any) {
    this.showCancel = true;
    this.errMessage = null;
    if (event.target.value === '-') {
      this.MatchingJobs = this.getMatchingWorkOffers();
    } else {
      this.Speciality = event.target.value;
      this.fs
        .filterPWOSearch(
          this.Speciality,
          this.form.value.cities ? this.form.value.cities[0].item_text : null
        )
        .subscribe((res: any) => {
          this.MatchingJobs = res.matchingJobOffers;
        });
    }
  }
  reset() {
    this.showCancel = false;
    this.getMatchingWorkOffers();
  }

  //
  citiesDrowdownSettings: any;
  MunicipalityList: any;
  MunicipalityDropdownSettings: any;
  CitiesList: any;
  form: any = FormGroup;
  initForm() {
    this.form = this.formBuilder.group({
      cities: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
    });
  }
  onSpecialitySelect($event: any) {
    console.log('Selected speciality is ', $event);
    console.log(this.form.value.municipality);
  }

  onSpecialityDeselect($event: any) {
    console.log('Deselected speciality is ', $event);
  }
  onCityDeselect($event: any) {
    this.form.controls['municipality'].reset();
    this.form.controls['cities'].reset();
    if (this.Speciality === null || '-') {
      this.MatchingJobs === this.getMatchingWorkOffers();
    } else {
      this.fs.filterPWOSearch(this.Speciality, null).subscribe((res: any) => {
        this.MatchingJobs = res.matchingJobOffers;
      });
    }
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
        console.log(this.Speciality);
        if (this.Speciality === '-' || null) {
          this.fs
            .filterPWOSearch(null, this.form.value.cities[0].item_text)
            .subscribe((res: any) => {
              this.MatchingJobs = res.matchingJobOffers;
            });
        } else {
          this.fs
            .filterPWOSearch(
              this.Speciality,
              this.form.value.cities[0].item_text
            )
            .subscribe((res: any) => {
              this.MatchingJobs = res.matchingJobOffers;
            });
        }

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
}
