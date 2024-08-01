import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
* The DirectorDialogComponent displays information about a director
*/
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrl: './director-dialog.component.scss'
})
export class DirectorDialogComponent {

  /**
  * Creates an instance of DirectorDialogComponent
  * @param data - The data passed to the dialog containing the director information.
  * @param dialogRef - Reference to the dialog opened for displaying the director information
  */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DirectorDialogComponent>
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
