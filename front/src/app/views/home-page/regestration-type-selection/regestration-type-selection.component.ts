import { Component } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regestration-type-selection',
  templateUrl: './regestration-type-selection.component.html',
  styleUrls: ['./regestration-type-selection.component.css'],
})
export class RegestrationTypeSelectionComponent {
  constructor(private fs: FreelancerService, private router: Router) {}
  signupTest() {
    this.fs.data$.subscribe((res) => {
      if (res) {
        this.router.navigate(['/FGsignup']);
      } else {
        this.router.navigate(['/Fsignup']);
      }
    });
  }
}
