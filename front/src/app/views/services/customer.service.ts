import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  updateLocalStorageAfterSaveFreelancer(freelancerId: string) {
    throw new Error('Method not implemented.');
  }
 
  deletePrivateJobOffer(privateJobOfferId: string) {
    return this.http
      .delete(
        `http://localhost:5000/api/customerWorkOffer/cancelJobOffer/${privateJobOfferId}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error in deletePrivateJobOffer:', error);
          throw error;
        })
      );
  }
  route: any;

  getCustomerInfos() {
    return JSON.parse(localStorage.getItem('customerInfos')!);
  }

  private dataSource = new BehaviorSubject<any>(null);
  private socket: Socket = io('http://localhost:5000/customer');

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
    const url = `http://localhost:5000/api/customerWorkOffer/getAllPrivateJobOffers/${id}`;
    
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error fetching job offers:', error);
        throw error;
      })
    );
  }

  //create private job offer
  createPrivateJobOffer(privateJobOfferData: any, taskTable: any) {
    return this.http.post(
      'http://localhost:5000/api/customerWorkOffer/createPrivateJob',
      { privateJobOfferData, taskTable }  // Envoyer les données sous forme d'objet
    ).pipe(
      catchError((error: any) => {
        console.error('Error creating private job offer:', error);
        throw error;
      })
    );
  }

  getPrivateJobOfferDetails(privateJobOfferId: any) {
    return this.http.get(
      `http://localhost:5000/api/customerWorkOffer/getPrivateJobOfferDetails/${privateJobOfferId}`
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

  editPrivateJobOffer(privateJobOfferId: any, updatedJobOfferData: any) {
    return this.http
      .put(
        `http://localhost:5000/api/customerWorkOffer/editPrivateJob/${privateJobOfferId}`,
        updatedJobOfferData
      )
      .pipe(
        catchError((error) => {
          console.error('Error in editPrivateJobOffer:', error);
          throw error;
        })
      );
  }

  sendPassResetMail(Email: any) {
    return this.http.post('http://localhost:5000/api/customer/ResetPassword', {
      freelancerEmail: Email,
    });
  }

  disableAccount() {
    const customerId = this.getCustomerInfos()?._id;
    const url = `http://localhost:5000/api/customer/disable/${customerId}`;

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



getAllFreelancers() {
  return this.http
    .get('http://localhost:5000/api/customer/getAllFreelancers')
    .pipe(
      catchError((error) => {
        console.error('Error accepting freelancer:', error);
        throw error;
      })
    );
}

getSavedFreelancers(customerId: string) {
  return this.http.get(
    `http://localhost:5000/api/customer/getSavedFreelancers/${customerId}`
  );
}

getFreelancerDetails(freelancerId: string) {
  return this.http
    .get(
      `http://localhost:5000/api/customer/viewFreelancerDetails/${freelancerId}`
    )
    .pipe(
      catchError((error) => {
        console.error('Error in getFreelancerDetails:', error);
        throw error;
      })
    );
}

saveFreelancer(customerId: string, freelancerId: string) {
  // Include the companyId and freelancerId in the URL
  const url = `http://localhost:5000/api/customer/saveFreelancer/${customerId}/${freelancerId}`;

  // You can pass an empty object as the second parameter if there is no request body
  return this.http.post(url, {}).pipe(
    catchError((error) => {
      console.error('Error in saveFreelancer:', error);
      throw error;
    })
  );
}

//

getFreelancerReviews(freelancerId: string) {
  return this.http.get(
    `http://localhost:5000/api/customer/getFreelancerReviews/${freelancerId}`
  );
}

joinRoom(room: string): void {
  this.socket.emit('joinRoom', room);
}

sendMessage(room: string, message: string): void {
  this.socket.emit('chatMessage', { room, message });
}

receiveMessage(): Observable<string> {
  return new Observable((observer) => {
    this.socket.on('message', (data: string) => {
      observer.next(data);
    });
  });
}


}

