import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private route: Router) {}
  private dataSource = new BehaviorSubject<any>(null);
  Load: boolean = true;
  data$ = this.dataSource.asObservable();


  sendData(data: any) {
    this.dataSource.next(data);
  }

  setCompanyInfos(CompanyForm: any) {
    const form = JSON.parse(CompanyForm);
    const Company: any = {
      _id: form._id,
      Name: form.CompanyName,
      Email: form.CompanyEmail,
      CWebsite: form.CompanyWebsite,
      CLogo: form.ProfilePicture,
      Csignature: form.CompanySignature,
      CDescription: form.CompanyDescription,
      CPhone: form.CompanyPhone,
      CLocation: form.Location,
      JoinDate: form.JoinDate,
      CReviews: form.Reviews,
      WorkOfferd: form.WorkOfferd,
      MoneySpent: form.MoneySpent,
      SavedFreelancers: form.savedFreelancers,
    };
    localStorage.setItem('companyInfos', JSON.stringify(Company));
  }

  getCompanyInfos(){
    return JSON.parse(localStorage.getItem('companyInfos')!);
  }

  logout(){
    localStorage.removeItem('companyInfos');
    this.route.navigate(['/']);
  }



  /*************sign up ************************/
  createCompany(languages: any[]) {
    return this.http.post(
      'http://localhost:5000/api/company/create',
      languages
    );
  }

  verifyCompany(_id: any, vcode: any) {
    return this.http.put('http://localhost:5000/api/company/verify', {
      companyId: _id,
      VerificationCode: vcode,
    });
  }
  sendVerLink(_id: any, email: any) {
    return this.http.post('http://localhost:5000/api/company/sendLink', {
      companyId: _id,
      companyMail: email,
    });
  }

  sendVerificationLink(email: any, _id: any) {
    return this.http.post('http://localhost:5000/api/company/sendLink', {
      companyId: _id,
      companyMail: email, // ken 8alta ija lena
    });
  }

  getCities() {
    return this.http.get('http://localhost:5000/api/city/getAll');
  }

  getTunisianCitiesAndTowns() {
    const url =
      'https://nominatim.openstreetmap.org/search?q=Tunisia&type=city&type=town';
    return this.http.get<any[]>(url);
  }

  getAllWorkData() {
    return this.http.get('http://localhost:5000/api/work/getWorkData');
  }




/*********************PARTIE PROFILE************************/
disableAccount() {
  const companyId = this.getCompanyInfos()?._id;
  const url = `http://localhost:5000/api/company/disable/${companyId}`;

  return this.http.put(url, {}).pipe(
    catchError((error) => {
      console.error('Error disabling account:', error);
      throw error;
    })
  );
}


//edit profile :
//to do





/*************************PARTIE MY JOBS**************************************/

  // partie public
  getAllPublicJobOffers(id: any) {
    return this.http.get(
      `http://localhost:5000/api/companyWorkOffer/getAllPublicJobOffers/${id}`
    );
  }
  //create public job
  createPublicJob(publicJobData: any) {
    return this.http.post(
      'http://localhost:5000/api/companyWorkOffer/createPublicJob',
      publicJobData
    ).pipe(
      catchError((error) => {
        console.error('Error in createPublicJob:', error);
        throw error;
      })
    );
  }

//get details Pub job
getPublicJobDetails(publicJobOfferId: any)  {
  return this.http.get(`http://localhost:5000/api/companyWorkOffer/getPublicJobDetails/${publicJobOfferId}`);
}


acceptFreelancer(publicJobOfferId: string, freelancerId: string) {
  const url = `http://localhost:5000/api/companyWorkOffer/acceptFreelancer/${publicJobOfferId}/${freelancerId}`;
  return this.http.post(url, {}).pipe(
    catchError((error) => {
      console.error('Error accepting freelancer:', error);
      throw error;
    })
  );
}


sendContract(publicJobOfferId: string, freelancerId: string) {
  const url = `http://localhost:5000/api/freelancer/sendFreelancerContract/${publicJobOfferId}/${freelancerId}`;

    return this.http.post(url, {}).pipe(
      catchError((error) => {
        console.error('Error sending contract:', error);
        throw error;
      })
    );
}






  //edit pub job
  editPublicJob(publicJobId: string, updatedData: any) {
    return this.http
      .put(
        `http://localhost:5000/api/companyWorkOffer/editPublicJob/${publicJobId}`,
        updatedData
      )
      .pipe(
        catchError((error) => {
          console.error('Error in editPublicJob:', error);
          throw error;
        })
      );
  }

  //delete pub job
  deletePublicJobOffer(jobOfferId: string) {
    const url = `http://localhost:5000/api/companyWorkOffer/cancelPublicJobOffer/${jobOfferId}`;
    return this.http.delete(url);
  }




  //private jobs
  getAllPrivateJobOffers(id: any) {
    return this.http.get(
      `http://localhost:5000/api/companyWorkOffer/getAllPrivateJobOffers/${id}`
    );
  }

  //create private job offer
  createPrivateJobOffer(privateJobOfferData: any, taskTable: any) {
    return this.http
      .post('http://localhost:5000/api/companyWorkOffer/createPrivateJob', {
        privateJobOfferData,
        taskTable,
      })
      .pipe(
        catchError((error) => {
          console.error('Error creating private job offer:', error);
          throw error;
        })
      );
  }

  // details prv JO
  getPrivateJobOfferDetails(privateJobOfferId: any) {
    return this.http.get(
      `http://localhost:5000/api/companyWorkOffer/getPrivateJobOfferDetails/${privateJobOfferId}`
    );
  }



//cancel prv JO
deletePrivateJobOffer(privateJobOfferId: string) {
  return this.http.delete(
    `http://localhost:5000/api/companyWorkOffer/cancelJobOffer/${privateJobOfferId}`
  ).pipe(
    catchError((error) => {
      console.error('Error in deletePrivateJobOffer:', error);
      throw error;
    })
  );
}

//edit prv JO
editPrivateJobOffer(privateJobOfferId: any, updatedJobOfferData: any) {
  return this.http.put(
    `http://localhost:5000/api/companyWorkOffer/editPrivateJob/${privateJobOfferId}`,
    updatedJobOfferData
  ).pipe(
    catchError((error) => {
      console.error('Error in editPrivateJobOffer:', error);
      throw error;
    })
  );
}












/**************************************PARTIE TALENT  ************************/

//freelancers page
  getAllFreelancers() {
    return this.http.get('http://localhost:5000/api/company/getAllFreelancers').pipe(
      catchError((error) => {
        console.error('Error accepting freelancer:', error);
        throw error;
      })
    );
  }

  //get l saved freelancers fel page saved freelancers
  getSavedFreelancers(companyId: string) {
    return this.http.get(
      `http://localhost:5000/api/company/getSavedFreelancers/${companyId}`
    );
  }

  //freelancer profile page
getFreelancerDetails(freelancerId: string) {
  return this.http.get(`http://localhost:5000/api/company/viewFreelancerDetails/${freelancerId}`).pipe(
    catchError((error) => {
      console.error('Error in getFreelancerDetails:', error);
      throw error;
    })
  );
}

  saveFreelancer(companyId: string, freelancerId: string) {
    // Include the companyId and freelancerId in the URL
    const url = `http://localhost:5000/api/company/saveFreelancer/${companyId}/${freelancerId}`;

    // You can pass an empty object as the second parameter if there is no request body
    return this.http.post(url, {}).pipe(
      catchError((error) => {
        console.error('Error in saveFreelancer:', error);
        throw error;
      })
    );
  }

  updateLocalStorageAfterSaveFreelancer(freelancerId: string): void {
    const companyInfos = this.getCompanyInfos();

    if (companyInfos) {
      companyInfos.SavedFreelancers = companyInfos.SavedFreelancers || [];
      companyInfos.SavedFreelancers.push({ freelancerId, freelancerName: '' }); // Assuming you don't have the freelancer name at this point

      localStorage.setItem('companyInfos', JSON.stringify(companyInfos));
    }
  }



//saved freelancers page

unsaveFreelancer(companyId: string, freelancerId: string) {
  const url = `http://localhost:5000/api/company/unsaveFreelancer/${companyId}/${freelancerId}`;

  return this.http.post(url, {}).pipe(
    catchError((error) => {
      console.error('Error in unsaveFreelancer:', error);
      throw error;
    })
  );
}

updateLocalStorageAfterUnsaveFreelancer(companyInfos: any, freelancerId: string): void {
  if (companyInfos) {
    companyInfos.SavedFreelancers = companyInfos.SavedFreelancers.filter((saved: any) => saved.freelancerId !== freelancerId);
    localStorage.setItem('companyInfos', JSON.stringify(companyInfos));
  }
}



}
