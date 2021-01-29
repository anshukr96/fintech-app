import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  configSuccess: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 3000,
    horizontalPosition: 'left',
    verticalPosition: 'bottom',
  };
  constructor(private _snackbar: MatSnackBar) {}

  openSnackbar(msg: string) {
    this._snackbar.openFromComponent(CustomSnackbarComponent, {
      data: msg,
      ...this.configSuccess,
    });
  }
}
