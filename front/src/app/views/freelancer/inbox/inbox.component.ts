import { Component } from '@angular/core';
import { RecievedContractsComponent } from './recieved-contracts/recieved-contracts.component';
import { RecievedWorkOffersComponent } from './recieved-work-offers/recieved-work-offers.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  displayComponent: any = RecievedWorkOffersComponent;
  displayRecievedContracts() {
    this.displayComponent = RecievedContractsComponent;
  }
  displayRecievedWorkOffers() {
    this.displayComponent = RecievedWorkOffersComponent;
  }
}
