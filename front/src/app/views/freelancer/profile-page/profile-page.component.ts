import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { io, Socket } from 'socket.io-client';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  freeLancerInfos: any = JSON.parse(localStorage.getItem('freeLancerInfos')!);
  private socket: any = Socket;
  ngOnInit() {}
  constructor(private router: Router, private fs: FreelancerService) {
    this.socket = io('http://localhost:5000/freelancer');
    this.socket.connect();
    this.socket.emit('newUserConnected', {
      Name: this.freeLancerInfos?.Name,
      _id: this.freeLancerInfos?._id,
    });
    this.socket.on('userConnected', (data: any) => {
      console.log('Connected Users ');
      data.map((item: any, index: any) => {
        console.log('Name = ' + item.Name + '  Id = ' + item._id);
      });
    });
    this.socket.on('userDisconnected', (data: any) => {
      console.log('user Disconnected , Remaining Users : ');
      data.map((item: any, index: any) => {
        console.log('Name = ' + item.Name, ' Id = ' + item._id);
      });
    });
  }

  testCookie() {
    this.fs.testCookie().subscribe((res: any) => {
      console.log(res);
    });
  }
  ngOnDestroy() {
    this.socket.emit('userDisconnected', this.freeLancerInfos._id);
  }
}
