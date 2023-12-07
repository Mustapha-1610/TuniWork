import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { io, Socket } from 'socket.io-client';
import { FreelancerService } from 'src/app/views/services/freelancer.service';

@Component({
  selector: 'app-freelancerlayout',
  templateUrl: './freelancerlayout.component.html',
  styleUrls: ['./freelancerlayout.component.css'],
})
export class FreelancerlayoutComponent implements OnDestroy, OnInit {
  private socket: any = Socket;
  freeLancerInfos: any;
  connectedUsers: any;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private fs: FreelancerService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private zone: NgZone // Inject NgZone
  ) {
    this.socket = io('http://localhost:5000/freelancer');
    this.socket.connect();

    this.socket.on('userConnected', (data: any) => {
      this.zone.run(() => {
        this.connectedUsers = data.length;
      });
    });

    this.socket.on('userDisconnected', (data: any) => {
      this.zone.run(() => {
        this.connectedUsers = data.length;
      });
    });

    //receiving w body l notif
    this.socket.on('NotificationRefresh', (data: any) => {
      if (data.freelancerId === this.freeLancerInfos._id) {
        this.refreshProfile();
      }
    });
  }

  ngOnDestroy() {
    this.socket.emit('userDisconnected', this.freeLancerInfos._id);
  }

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
  unreadCount: number = 0;
  dropdownOpen: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.unreadCount = 0;
    this.fs.cleanNotifications().subscribe((res: any) => {
      if (res.success) {
        this.refreshProfile();
      }
    });
  }
  ngOnInit() {
    this.refreshProfile();
    this.freeLancerInfos = this.fs.getFreelancerCredits();
    this.socket.emit('newUserConnected', {
      Name: this.freeLancerInfos?.Name,
      _id: this.freeLancerInfos?._id,
    });
  }

  calculateUnreadCount() {
    this.unreadCount = this.freeLancerInfos.Notifications.filter(
      (Notifications: any) => !Notifications.readStatus
    ).length;
  }
  refreshProfile() {
    this.fs.refreshProfile().subscribe((res: any) => {
      if (res.freelancerAccount) {
        this.fs.setFreelancerCredits(JSON.stringify(res.freelancerAccount));
        this.freeLancerInfos = this.fs.getFreelancerCredits();
        this.calculateUnreadCount();
        console.log(this.unreadCount);
      } else if (res.jwtError) {
        localStorage.removeItem('freeLancerInfos');
        this.router.navigate(['/']);
      }
    });
  }
}
