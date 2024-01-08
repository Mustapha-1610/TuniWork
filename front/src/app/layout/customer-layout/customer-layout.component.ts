import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { CustomerService } from 'src/app/views/services/customer.service';



@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css',
  /*"../../../../assets/templateC/css/bootstrap.css",
  "../../../../assets/templateC/css/style.css",
  "../../../../assets/templateC/js/main.js",
  "../../../../assets/templateC/css/lib/animate/animate.css",
  "../../../../assets/templateC/css/lib/animate/animate.min.css",
  "../../../../assets/templateC/css/lib/easing/easing.js",
*/
  


]
})
export class CustomerLayoutComponent implements OnDestroy {
  customerInfos: any = this.cus.getCustomerCredits
  connectedUsers: any;
  private socket:any = Socket ; 

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private cus: CustomerService
  ) 


{


    // Socket setup
    this.socket = io('http://localhost:5000/customer');
    this.socket.connect();

    // Emit new user connection event
    this.socket.emit('newUserConnected', {
      Name: this.customerInfos?.Name,
      _id: this.customerInfos?._id,
    });

    // Listen for userConnected event
    this.socket.on('userConnected', (data: any) => {
      console.log(data.length);
      this.connectedUsers = data.length;

      // Log information for each connected user
      data.map((item: any , index: any) => {
        console.log('Name = ' + item.Name + '  Id = ' + item._id);
      });
    });

    // Listen for userDisconnected event
    this.socket.on('userDisconnected', (data: any) => {
      this.connectedUsers = data.length;

      // Log information for each disconnected user
      data.map((item: any, index: any) => {
        console.log('Name = ' + item.Name, ' Id = ' + item._id);
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
    // Emit userDisconnected event when component is destroyed
    if (this.customerInfos) {
      this.socket.emit('userDisconnected', this.customerInfos._id);
    }
  }

  logout() {
    // Sign out and navigate to the home page
    this.authService
      .signOut()
      .then(() => {
        localStorage.removeItem('customerInfos');
        this.router.navigate(['/']);
      })
      .catch(() => {
        localStorage.removeItem('customerInfos');
        this.router.navigate(['/']);
      });
  }
}

