import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
* The SingleMovieComponent displays information about a single movie
*/
@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrl: './single-movie.component.scss'
})
export class SingleMovieComponent {

   /**
   * Creates an instance of SingleMovieComponent.
   * @param data - The data passed to the dialog containing the movie information.
   * @param dialogRef - Reference to the dialog opened for displaying the single movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SingleMovieComponent>
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
