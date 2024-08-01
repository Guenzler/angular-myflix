import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
* The GenreDialogComponent displays information about a genre
*/
@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss']
})
export class GenreDialogComponent {

  /**
  * Creates an instance of GenreDialogComponent
  * @param data - The data passed to the dialog containing the genre information.
  * @param dialogRef - Reference to the dialog opened for displaying the genre information
  */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GenreDialogComponent>
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
