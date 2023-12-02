import { Component, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { io, Socket } from 'socket.io-client';
import { FreelancerService } from 'src/app/views/services/freelancer.service';

@Component({
  selector: 'app-freelancerlayout',
  templateUrl: './freelancerlayout.component.html',
  styleUrls: ['./freelancerlayout.component.css'],
})
export class FreelancerlayoutComponent implements OnDestroy {
  private socket: any = Socket;
  freeLancerInfos = this.fs.getFreelancerCredits();
  connectedUsers: any;
  notifications: any[] = [];
  unreadNotificationCount: number = 0;
  showNotifications = false;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private fs: FreelancerService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private zone: NgZone // Inject NgZone
  ) {
    this.socket = io('http://localhost:5000/freelancer');
    this.socket.connect();

    this.socket.emit('newUserConnected', {
      Name: this.freeLancerInfos?.Name,
      _id: this.freeLancerInfos?._id,
    });

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
    this.socket.on('privateJobOfferNotification', (data: any) => {
      if (data.freelancerId === this.freeLancerInfos._id) {
        this.notifications.push({
          message: `You received a private job offer: ${data.jobOfferName} , id is: ${data.jobOfferId} from the company ${data.jobOfferCompany}`,
        });

        this.unreadNotificationCount++;


      }
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.unreadNotificationCount = 0;
    }
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
}
