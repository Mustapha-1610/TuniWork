import { Component } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
})
export class NotificationsPageComponent {
  constructor(private fs: FreelancerService) {}
  freelancerInfos: any = this.fs.getFreelancerCredits();
}
