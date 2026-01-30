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
import {TicketModalData} from './models/ticket-modal.model';
import {MatOption, MatSelect} from '@angular/material/select';
import {Status, statuses} from '../../../../shared/models/status';
import {LowerCasePipe} from '@angular/common';

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
    TranslatePipe,
    MatSelect,
    MatOption,
    LowerCasePipe
  ],
  templateUrl: './ticket-modal.html',
  styleUrl: './ticket-modal.scss',
})
export class TicketModal {
  data: TicketModalData | undefined = inject(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<TicketModal>
) {
    if (this.data?.card) {

      this.form.addControl(
        'status',
        new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        })
      );
      this.form.patchValue({
        title: this.data.card.title,
        description: this.data.card.description,
        status: this.data.card.status,
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
    status: new FormControl('', {
      nonNullable: true,
    }),
  });

  public createTicket(): void {
    const newCard: NewCard = {
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
    }
    this.dialogRef.close(newCard);
  }

  public saveTicket(): void {
    if (this.data?.card) {
      const card: Card = {
        id: this.data?.card.id,
        title: this.form.controls.title.value,
        description: this.form.controls.description.value,
        status: this.form.controls.status.value as Status,
      }
      this.dialogRef.close(card);
    }
  }

  protected readonly close = close;
  protected readonly statuses = statuses;
}
