import { Component } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ongoing-work-component',
  templateUrl: './ongoing-work-component.component.html',
  styleUrls: ['./ongoing-work-component.component.css'],
})
export class OngoingWorkComponentComponent {
  constructor(private fs: FreelancerService, private router: Router) {}
  freelancerData: any = this.fs.getFreelancerCredits();
  check(id: any) {
    console.log(id);
    this.router.navigate(['/freelancer/WPDisplay', id]);
  }
}
