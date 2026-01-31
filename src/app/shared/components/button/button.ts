import { Component, input, output } from '@angular/core';
import { MatButton, MatButtonAppearance } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButton],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  public clicked = output<void>();

  public text = input.required<string>();
  public disabled = input<boolean>(false);
  public type = input<MatButtonAppearance>('outlined');
}
