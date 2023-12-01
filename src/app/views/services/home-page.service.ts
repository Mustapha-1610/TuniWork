import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  getAllFreelancers(form: any) {
    return this.http.post('http://localhost:5000/api/freelancer/auth', form);
  }
  getAllCustomer(form: any) {
    return this.http.post('http://localhost:5000/api/customer/auth', form);
  }
}
