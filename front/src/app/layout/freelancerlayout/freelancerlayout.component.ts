import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-freelancerlayout',
  templateUrl: './freelancerlayout.component.html',
  styleUrls: ['./freelancerlayout.component.css'],
})
export class FreelancerlayoutComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('freeLancerInfos');
    this.router.navigate(['/']);
  }
}
