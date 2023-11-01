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
    return this.http.post('http://localhost:5000/api/freelancer/auth', data);
  }
}
