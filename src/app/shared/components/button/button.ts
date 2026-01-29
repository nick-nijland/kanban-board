import {Component, input, output} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButton],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  public clicked = output<void>();

  public text = input.required<string>();
  public disabled = input.required<boolean>();
}
