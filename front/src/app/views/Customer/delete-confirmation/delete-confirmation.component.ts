import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Output() deleteCanceled = new EventEmitter<void>();

  confirmDelete(): void {
    this.deleteConfirmed.emit();
  }

  cancelDelete(): void {
    this.deleteCanceled.emit();
  }

}
