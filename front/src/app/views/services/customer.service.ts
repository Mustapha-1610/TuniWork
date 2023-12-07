import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  route: any;

  getCustomerInfos() {
    return JSON.parse(localStorage.getItem('customerInfos')!);
  }

  private dataSource = new BehaviorSubject<any>(null);
  private socket: Socket = io('http://localhost:5000/company');

  Load: boolean = true;
  private customerInfos: any;
  data$ = this.dataSource.asObservable();
  sendData(data: any) {
    this.dataSource.next(data);
  }
  sendFreelancerNotification(id: any) {
    this.socket.emit('sendFreelancerNotification', { id });
  }
  authC(data: any) {
    return this.http.post(
      'http://localhost:5000/api/customer/multiAuth',
      data,
      {
        withCredentials: true, // <-- Make sure this is set
      }
    );
  }

  constructor(private http: HttpClient) {}

  setCustomerInfos(CustomerForm: any) {
    const form: any = JSON.parse(CustomerForm);
    const CustomerAccount: any = {
      _id: form._id,
      Name: form.Name,

      LastName: form.LastName,
      Email: form.Email,

      PhoneNumber: form.PhoneNumber,
      Location: form.Location,
      EstimatedWorkLocation: form.EstimatedWorkLocation,
      JoinDate: form.JoinDate,
      Reviews: form.Reviews,
      WorkOfferd: form.WorkOfferd,
      MoneySpent: form.MoneySpent,
      SavedFreelancers: form.savedFreelancers,
      ProfilePicture: form.ProfilePicture,
    };
    localStorage.setItem('customerInfos', JSON.stringify(CustomerAccount));
  }

  createCustomerAccount(languages: any[]) {
    return this.http.post(
      `http://localhost:5000/api/customer/createCustomerAccount`,
      languages
    );
  }

  verifyCustomer(_id: any, vcode: any) {
    return this.http.put('http://localhost:5000/api/customer/verify', {
      customerId: _id,
      VerificationCode: vcode,
    });
  }

  getCustomerCredits() {
    return JSON.parse(localStorage.getItem('customerInfos')!);
  }

  logout() {
    localStorage.removeItem('customerInfos');
    this.route.navigate(['/']);
  }

  getAllPrivateJobOffers(id: any) {
    return this.http.get(
      `http://localhost:5000/api/customerWorkOffer/getAllPrivateJobOffers${id}`
    );
  }

  //create private job offer
  createPrivateJobOffer(privateJobOfferData: any) {
    return this.http
      .post(
        'http://localhost:5000/api/customerWorkOffer/createPrivateJob',
        privateJobOfferData
      )
      .pipe(
        catchError((error: any) => {
          console.error('Error creating private job offer:', error);
          throw error;
        })
      );
  }

  getPrivateJobOfferDetails(privateJobOfferId: any) {
    return this.http.get(
      `http://localhost:5000/api/companyWorkOffer/getPrivateJobOfferDetails/${privateJobOfferId}`
    );
  }

  auth(data: any) {
    return this.http.post(
      'http://localhost:5000/api/customer/multiAuth',
      data,
      {
        withCredentials: true,
      }
    );
  }

  sendPassResetMail(Email: any) {
    return this.http.post('http://localhost:5000/api/customer/ResetPassword', {
      freelancerEmail: Email,
    });
  }

  disableAccount() {
    const companyId = this.getCustomerInfos()?._id;
    const url = `http://localhost:5000/api/customer/disable/${companyId}`;

    return this.http.put(url, {}).pipe(
      catchError((error) => {
        console.error('Error disabling account:', error);
        throw error;
      })
    );
  }

  getCities() {
    return this.http.get('http://localhost:5000/api/city/getAll');
  }
}
