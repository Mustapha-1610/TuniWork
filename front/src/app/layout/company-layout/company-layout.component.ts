import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { io, Socket } from 'socket.io-client';
import { CompanyService } from 'src/app/views/services/company.service';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.css'],
})
export class CompanyLayoutComponent implements OnDestroy{

  companyInfos = this.cs.getCompanyInfos();

  connectedUsers: any;
  private socket: any = Socket;
  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private cs: CompanyService
  ) {
    this.socket = io('http://localhost:5000/company');
    this.socket.connect();
    this.socket.emit('newUserConnected', {
      Name: this.companyInfos?.Name,
      _id: this.companyInfos?._id,
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
    this.socket.emit('userDisconnected', this.companyInfos._id);
  }


  logout() {
    this.cs.logout();
  }


  toggleMenu() {
    const subMenu = document.getElementById('subMenu');
    if (subMenu) {
      subMenu.classList.toggle('open-menu');
    }
  }

}
