import { Component } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-finiched-work-component',
  templateUrl: './finiched-work-component.component.html',
  styleUrls: ['./finiched-work-component.component.css'],
})
export class FinichedWorkComponentComponent {
  constructor(private fs: FreelancerService, private router: Router) {}
  freelancerData: any = this.fs.getFreelancerCredits();
  check(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WPDisplay', id]);
  }
}
