import { Component } from '@angular/core';
import { BestMatchesComponentComponent } from '../best-matches-component/best-matches-component.component';
import { SavedJobsComponentComponent } from '../saved-jobs-component/saved-jobs-component.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  displayedComponent: any = BestMatchesComponentComponent;
  componentt = true;
  setComponent() {
    this.componentt = !this.componentt;
  }
  setBestMatchesComponent() {
    this.displayedComponent = BestMatchesComponentComponent;
  }
  setSavedJobsComponent() {
    this.displayedComponent = SavedJobsComponentComponent;
  }
}
