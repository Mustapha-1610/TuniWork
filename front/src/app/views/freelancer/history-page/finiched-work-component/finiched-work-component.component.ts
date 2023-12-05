import { Component } from '@angular/core';
import { FreelancerService } from 'src/app/views/services/freelancer.service';

@Component({
  selector: 'app-finiched-work-component',
  templateUrl: './finiched-work-component.component.html',
  styleUrls: ['./finiched-work-component.component.css'],
})
export class FinichedWorkComponentComponent {
  constructor(private fs: FreelancerService) {}
  freelancerData: any = this.fs.getFreelancerCredits();
}
