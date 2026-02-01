import {Component, inject, input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  public text = input.required<string>();
  public closeText = input.required<string>();

  ngOnInit() {
    this._snackBar.open(this.text(), this.translateService.instant('generic.close'), {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

}
