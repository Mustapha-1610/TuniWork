import { Component } from '@angular/core';
import { OngoingWorkComponentComponent } from './ongoing-work-component/ongoing-work-component.component';
import { FinichedWorkComponentComponent } from './finiched-work-component/finiched-work-component.component';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent {
  displayedComponent: any = OngoingWorkComponentComponent;
  setOngoingComponent() {
    this.displayedComponent = OngoingWorkComponentComponent;
  }
  setFinichedComponent() {
    this.displayedComponent = FinichedWorkComponentComponent;
  }
}
