import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FreelancerService } from '../../services/freelancer.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-freelancer-google-signup',
  templateUrl: './freelancer-google-signup.component.html',
  styleUrls: ['./freelancer-google-signup.component.css'],
})
export class FreelancerGoogleSignupComponent implements OnDestroy {
  private dataSubscription: Subscription;
  constructor(private route: ActivatedRoute, private fs: FreelancerService) {
    this.dataSubscription = this.fs.data$.subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });
  }
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe(); // Prevent memory leaks
      const dataSource = new BehaviorSubject<any>(null);
      this.fs.data$ = dataSource.asObservable();
    }
  }
}
