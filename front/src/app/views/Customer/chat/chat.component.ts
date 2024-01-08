import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{


  message = '';
  chatMessages: string[] = [];

  constructor(private CustomerService: CustomerService) {}

  ngOnInit(): void {
    this.CustomerService.receiveMessage().subscribe((message) => {
      this.chatMessages.push(message);
    });
  }

  sendMessage(): void {
    this.CustomerService.sendMessage('roomName', this.message);
    this.message = '';
  }

}
