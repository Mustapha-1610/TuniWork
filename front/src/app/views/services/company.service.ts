import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private route: Router) {}

  setCompanyInfos(CompanyForm: any) {
    const form = JSON.parse(CompanyForm);
    const Company: any = {
      _id: form._id,
      Name: form.CompanyName,
      Email: form.CompanyEmail,
      CWebsite: form.CompanyWebsite,
      Clogo: form.CompanyLogo,
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

  getCompanyInfos() {
    return JSON.parse(localStorage.getItem('companyInfos')!);
  }


  logout() {
    localStorage.removeItem('companyInfos');
    this.route.navigate(['/']);
  }





// my-jobs, partie public
  getAllPublicJobOffers(id:any){
    return this.http.get(`http://localhost:5000/api/companyWorkOffer/getAllPublicJobOffers/${id}`);
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



//edit pub job
  editPublicJob(publicJobId: string, updatedData: any) {
    return this.http.put(
      `http://localhost:5000/api/companyWorkOffer/editPublicJob/${publicJobId}`,
      updatedData
    ).pipe(
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







//my-jobs partie private jobs
  getAllPrivateJobOffers(id:any){
    return this.http.get(`http://localhost:5000/api/companyWorkOffer/getAllPrivateJobOffers/${id}`);
  }

  //create private job offer
createPrivateJobOffer(privateJobOfferData: any) {
  return this.http.post('http://localhost:5000/api/companyWorkOffer/createPrivateJob', privateJobOfferData).pipe(
    catchError((error) => {
      console.error('Error creating private job offer:', error);
      throw error;
    })
  );
}

// details prv JO
getPrivateJobOfferDetails(privateJobOfferId: any) {
  return this.http.get(`http://localhost:5000/api/companyWorkOffer/getPrivateJobOfferDetails/${privateJobOfferId}`);
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












  //talent-freelancers
  getAllFreelancers() {
    return this.http.get('http://localhost:5000/api/company/getAllFreelancers').pipe(
      catchError((error) => {
        console.error('Error in getAllFreelancers:', error);
        throw error;
      })
    );
  }


  //freelancer profile
getFreelancerDetails(freelancerId: string) {
  return this.http.get(`http://localhost:5000/api/company/viewFreelancerDetails/${freelancerId}`).pipe(
    catchError((error) => {
      console.error('Error in getFreelancerDetails:', error);
      throw error;
    })
  );
}


//save freelancer
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


//get l saved freelancers fel page saved freelancers
getSavedFreelancers(companyId: string) {
  return this.http.get(`http://localhost:5000/api/company/getSavedFreelancers/${companyId}`);
}





}
