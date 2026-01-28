import {Component, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Card} from '../../../../shared/models/card';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
})
export class Ticket {
  public card = input.required<Card>();
}
