import { Component, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'home-confirm-action-dialog',
  templateUrl: './confirm-action-dialog.component.html',
  styleUrls: ['./confirm-action-dialog.component.scss']
})
export class ConfirmActionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmActionDialogComponent>) { }

  emit(result: boolean) {
    this.dialogRef.close(result);
  }
}
