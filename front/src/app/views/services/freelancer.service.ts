import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  constructor(private http: HttpClient) {}
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
  setFreelancerCredits(form: any) {
    localStorage.setItem('freeLancerInfos', form);
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
}
