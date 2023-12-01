import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-freelancerlayout',
  templateUrl: './freelancerlayout.component.html',
  styleUrls: ['./freelancerlayout.component.css'],
})
export class FreelancerlayoutComponent {
  constructor(private router: Router, private authService: SocialAuthService) {}
  logout() {
    this.authService
      .signOut()
      .then(() => {
        localStorage.removeItem('freeLancerInfos');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        localStorage.removeItem('freeLancerInfos');
        this.router.navigate(['/']);
      });
  }
}
