import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Card} from '../../../../shared/models/card';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, MatButtonModule, MatMenuTrigger, MatMenuItem, MatMenu],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
})
export class Ticket {
  public card = input.required<Card>();
}
