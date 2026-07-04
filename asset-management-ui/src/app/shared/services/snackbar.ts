import { Injectable, inject } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackBar = inject(MatSnackBar);

  private horizontal: MatSnackBarHorizontalPosition = 'right';

  private vertical: MatSnackBarVerticalPosition = 'top';

  success(message: string) {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
        panelClass: ['success-snackbar']
      }
    );

  }

  error(message: string) {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 4000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
        panelClass: ['error-snackbar']
      }
    );

  }

  warning(message: string) {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3500,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
        panelClass: ['warning-snackbar']
      }
    );

  }

  info(message: string) {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        horizontalPosition: this.horizontal,
        verticalPosition: this.vertical,
        panelClass: ['info-snackbar']
      }
    );

  }

}
