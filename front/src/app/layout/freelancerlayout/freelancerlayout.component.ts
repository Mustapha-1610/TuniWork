import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  freeLancerInfos = this.fs.getFreelancerCredits();
  connectedUsers: any;
  private socket: any = Socket;
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private fs: FreelancerService
  ) {
    this.socket = io('http://localhost:5000/freelancer');
    this.socket.connect();
    this.socket.emit('newUserConnected', {
      Name: this.freeLancerInfos?.Name,
      _id: this.freeLancerInfos?._id,
    });
    this.socket.on('userConnected', (data: any) => {
      console.log(data.length);
      this.connectedUsers = data.length;

      data.map((item: any, index: any) => {
        console.log('Name = ' + item.Name + '  Id = ' + item._id);
      });
    });
    this.socket.on('userDisconnected', (data: any) => {
      this.connectedUsers = data.length;
      data.map((item: any, index: any) => {
        console.log('Name = ' + item.Name, ' Id = ' + item._id);
      });
    });
  }
  ngOnDestroy() {
    this.socket.emit('userDisconnected', this.freeLancerInfos._id);
  }
  //
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
