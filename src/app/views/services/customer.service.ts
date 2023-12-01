import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  setCustomerInfos(arg0: string) {
    throw new Error('Method not implemented.');
  }
 
  private dataSource = new BehaviorSubject<any>(null);
  Load: boolean = true;
  private customerInfos: any;
  data$ = this.dataSource.asObservable();
  sendData(data: any) {
    this.dataSource.next(data);
  }

  constructor(private http:HttpClient ) { }

  setCustomerCredits(CustomerForm:any)
  {
    const form :any = JSON.parse(CustomerForm);
    const CustomerAccount: any = {
      
      Name: form.Name,
      _id: form._id,
      Surname: form.Surname,
      Email: form.Email,
      Description: form.Description,
      Phone: form.Phone,
      Location: form.Location,
      EstimatedWorkLocation: form.EstimatedWorkLocation,
      JoinDate: form.JoinDate,
      Reviews: form.Reviews,
      WorkOfferd: form.WorkOfferd,
      MoneySpent: form.MoneySpent,
      SavedFreelancers: form.savedFreelancers,
    };
    localStorage.setItem('customerInfos', JSON.stringify(CustomerAccount));

    }
    createCustomerAccount(customerData: any[]) {
      return this.http.post(`http://localhost:5000/api/customer/createCustomerAccount`, customerData);
    }

    getTunisianCitiesAndTowns() {
      const url =
        'https://nominatim.openstreetmap.org/search?q=Tunisia&type=city&type=town';
      return this.http.get<any[]>(url);
    }


    getCustomerCredits() {
      return JSON.parse(localStorage.getItem('customerInfos')!);
    }
  

  
    /*logout() {
      localStorage.removeItem('customerInfos');
      this.route.navigate(['/']);
    }*/

    getAllPrivateJobOffers(id:any){
      return this.http.get(`http://localhost:5000/api/customerWorkOffer/getAllPrivateJobOffers${id}`);
    }
  
    //create private job offer
  createPrivateJobOffer(privateJobOfferData: any) {
    return this.http.post('http://localhost:5000/api/customerWorkOffer/createPrivateJob', privateJobOfferData).pipe(
      catchError((error: any) => {
        console.error('Error creating private job offer:', error);
        throw error;
      })
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
    return this.http.post(
      'http://localhost:5000/api/customer/ResetPassword',
      { freelancerEmail: Email }
    );
  }
  
  getCities() {
    return this.http.get('http://localhost:5000/api/city/getAll');
  }


  
  
  }


