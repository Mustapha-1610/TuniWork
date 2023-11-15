import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private router: Router, private fs: FreelancerService) {}
  freeLancerInfos: any;
  ngOnInit() {
    this.freeLancerInfos = JSON.parse(localStorage.getItem('freeLancerInfos')!);
  }
  testCookie() {
    this.fs.testCookie().subscribe((res: any) => {
      console.log(res);
    });
  }
}
