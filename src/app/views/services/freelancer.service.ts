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
      Name: form.Name,
      Surname: form.Surname,
      ProfilePicture: form.ProfilePicture,
      _id: form._id,
      Email: form.Email,
      PhoneNumber: form.PhoneNumber,
      WorkTitle: form.WorkTitle.WorkTitleText,
      Specialities: form.Speciality,
      WorkHistory: form.WorkHistory,
      EstimatedWorkLocation: form.EstimatedWorkLocation,
      Languages: form.Languages,
      PayRates: form.PayRate,
      Schedule: form.Schedule,
      SavedWorkOffers: form.SavedWorkOffers,
      PendingWorkOffers: form.pendingWorkOffers,
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
  filterPWOSearch(workSpeciality: any) {
    return this.http.post(
      'http://localhost:5000/api/freelancer/filterPWOSearch',
      {
        workSpeciality,
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
}
