import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Button} from '../../../../shared/components/button/button';
import {Card, NewCard} from '../../../../shared/models/card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-ticket-modal',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    Button,
    MatDialogClose,
    TranslatePipe
  ],
  templateUrl: './ticket-modal.html',
  styleUrl: './ticket-modal.scss',
})
export class TicketModal {
  data: Card | undefined = inject(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<TicketModal>
) {
    if (this.data) {
      this.form.patchValue({
        title: this.data.title,
        description: this.data.description,
      });
    }
  }

  public readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public createItem(): void {
    const card: NewCard = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
    }

    this.dialogRef.close(card);
  }

  protected readonly close = close;
}
