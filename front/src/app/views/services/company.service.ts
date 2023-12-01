import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';


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


}
