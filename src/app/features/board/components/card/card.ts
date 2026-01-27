import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {}
