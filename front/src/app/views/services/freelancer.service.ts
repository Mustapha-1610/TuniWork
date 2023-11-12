import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  constructor(private http: HttpClient) {}
  private dataSource = new BehaviorSubject<any>(null);
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
      data
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
}
