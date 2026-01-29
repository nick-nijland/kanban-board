import { Component } from '@angular/core';
import {
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

@Component({
  selector: 'app-create-modal',
  imports: [
    MatDialogContent,
    MatDialogActions,
    //MatDialogClose,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    Button,
    MatDialogClose
  ],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.scss',
})
export class CreateModal {
  constructor(private dialogRef: MatDialogRef<CreateModal>) {}

  readonly form = new FormGroup({
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
