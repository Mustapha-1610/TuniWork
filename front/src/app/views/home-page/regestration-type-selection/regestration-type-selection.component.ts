import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-regestration-type-selection',
  templateUrl: './regestration-type-selection.component.html',
  styleUrls: ['./regestration-type-selection.component.css'],
})
export class RegestrationTypeSelectionComponent {
  @Output() signalToParent = new EventEmitter();
  emitEvent() {
    this.signalToParent.emit();
  }
  test() {
    this.emitEvent();
  }
}
