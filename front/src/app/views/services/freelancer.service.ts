import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  constructor(private http: HttpClient) {}
  private dataSource = new BehaviorSubject<any>(null);
  Load: boolean = true;
  data$ = this.dataSource.asObservable();
  refreshProfile() {
    return this.http.get('http://localhost:5000/api/freelancer/refreshProfile');
  }
  sendData(data: any) {
    this.dataSource.next(data);
  }
  createFreelancer(languages: any[]) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/create',
      languages
    );
  }
  getAllWorkData() {
    return this.http.get('http://localhost:5000/api/work/getWorkData');
  }
  auth(data: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/multiAuth',
      data,
      {
        withCredentials: true, // <-- Make sure this is set
      }
    );
  }
  setFreelancerCredits(freelancerForm: any) {
    const form: any = JSON.parse(freelancerForm);
    const FreelancerAccount: any = {
      _id: form._id,
      Name: form.Name,
      Surname: form.Surname,
      ProfilePicture: form.ProfilePicture,
      Email: form.Email,
      PhoneNumber: form.PhoneNumber,
      WorkTitle: form.WorkTitle.WorkTitleText,
      Specialities: form.Speciality,
      WorkHistory: form.WorkHistory,
      EstimatedWorkLocation: form.EstimatedWorkLocation,
      Languages: form.Languages,

      Schedule: form.Schedule,
      SavedWorkOffers: form.SavedWorkOffers,
      PendingWorkOffers: form.pendingWorkOffers,
      Notifications: form.Notifications.slice().reverse(),
      CompanyRecievedContracts: form.CompanyRecievedContracts.slice().reverse(),
      ProposedPrivateWorks: form.ProposedPrivateWorks.slice().reverse(),

      PayRate: {
        HourlyRate: form.PayRate.HourlyRate,
        PayPerTaskRate: form.PayRate.PayPerTaskRate,
      },

    };
    localStorage.setItem('freeLancerInfos', JSON.stringify(FreelancerAccount));
  }
  getFreelancerCredits() {
    return JSON.parse(localStorage.getItem('freeLancerInfos')!);
  }



  verifyFreelancer(_id: any, vcode: any) {
    return this.http.put('http://localhost:5000/api/freelancer/verify', {
      freeLancerId: _id,
      VerificationCode: vcode,
    });
  }
  sendVerLink(_id: any, email: any) {
    return this.http.post('http://localhost:5000/api/freelancer/sendLink', {
      freeLancerId: _id,
      freeLancerMail: email,
    });
  }
  googleLogin(email: any) {
    return this.http.post('http://localhost:5000/api/freelancer/LgoogleAuth', {
      freelancerEmail: email,
    });
  }
  sendVerificationLink(email: any, _id: any) {
    return this.http.post('http://localhost:5000/api/freelancer/sendLink', {
      freeLancerId: _id,
      freeLancerMail: email,
    });
  }
  testCookie() {
    return this.http.post('http://localhost:5000/api/freelancer/profile', null);
  }
  sendPassResetMail(Email: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/sendPassResetMail',
      { freelancerEmail: Email }
    );
  }
  ResetPass(Token: any, Password: any, ConfirmPassword: any) {
    return this.http.put('http://localhost:5000/api/freelancer/PassReset', {
      jwToken: Token,
      newPassword: Password,
      confirmNewPassword: ConfirmPassword,
    });
  }
  getBestMatchingWO(id: any) {
    return this.http.post(
      'http://localhost:5000/api/companyWorkOffer/getMatchingPublicWorkOffers',
      {
        freelancerId: id,
      }
    );
  }
  getPublicWorkOfferInfos(id: any) {
    return this.http.post(
      'http://localhost:5000/api/companyWorkOffer/getPublicWorkOffer',
      { publicWorkOfferId: id }
    );
  }
  applyPWO(Fid: any, Jid: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/applyForPublicJob',
      { freelancerId: Fid, jobOfferId: Jid }
    );
  }
  unapplyPWO(freelancerId: any, PWOId: any) {
    return this.http.put('http://localhost:5000/api/freelancer/unapplyPWO', {
      freelancerId,
      PWOId,
    });
  }
  savePWO(freelancerId: any, PWOId: any, PWOTitle: any, PWODescription: any) {
    return this.http.put('http://localhost:5000/api/freelancer/savePWO', {
      freelancerId,
      PWOId,
      PWOTitle,
      PWODescription,
    });
  }
  unsavePwo(freelancerId: any, PWOId: any) {
    return this.http.put('http://localhost:5000/api/freelancer/unsavePWO', {
      freelancerId,
      PWOId,
    });
  }
  filterPWOSearch(workSpeciality: any, city: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/filterPWOSearch',
      {
        workSpeciality,
        City: city,
      }
    );
  }
  updatePP(imageUrl: any) {
    return this.http.put('http://localhost:5000/api/freelancer/updatePP', {
      imageUrl,
    });
  }
  getTunisianCitiesAndTowns() {
    const url =
      'https://nominatim.openstreetmap.org/search?q=Tunisia&type=city&type=town';
    return this.http.get<any[]>(url);
  }
  getCities() {
    return this.http.get('http://localhost:5000/api/city/getAll');
  }
  cleanNotifications() {
    return this.http.get(
      'http://localhost:5000/api/freelancer/cleanNotifications'
    );
  }
  getWorkOfferProgress(id: any) {
    return this.http.post(
      'http://localhost:5000/api/companyWorkOffer/getWorkOfferInfos',
      { workOfferId: id }
    );
  }
  updateProg(PWOId: any, IdsArray: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/updatePWOProgress',
      { PWOId, IdsArray }
    );
  }
  accessPaymentRequestPage(workId: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/sendPaymentRequest',
      { workId }
    );
  }
  acceptContract(contractId: any, contractUrl: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/acceptWorkContract',
      { contractId, contractUrl }
    );
  }
  declineContract(contractId: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/declineWorkContract',
      { contractId }
    );
  }
  getPrivateWorkOfferInfos(id: any) {
    return this.http.post('http://localhost:5000/api/freelancer/getPWOInfos', {
      pwoId: id,
    });
  }
  acceptPrivateWorkOffer(id: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/acceptPrivateJob',
      {
        jobId: id,
      }
    );
  }
  declinePrivateWorkOffer(id: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/declinePrivateJob',
      {
        jobId: id,
      }
    );
  }
  submitPaymentRequest(id: any, attachements: any) {
    return this.http.post('http://localhost:5000/api/paymentRequest/create', {
      workId: id,
      attachements,
    });
  }
  submitPaymentReport(workId: any, Title: any, Description: any) {
    return this.http.post('http://localhost:5000/api/paymentRequest/report', {
      workId,
      Title,
      Description,
    });
  }


  getFreelancerDetails(freelancerId: string) {
    return this.http.get(`http://localhost:5000/api/freelancer/${freelancerId}`, {
    });
  }
}



