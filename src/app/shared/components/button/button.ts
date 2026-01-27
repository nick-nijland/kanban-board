import {Component, input} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButton],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class Button {
  public text = input.required<string>();
}
