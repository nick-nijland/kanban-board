import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '../../../../shared/models/card';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../../shared/components/button/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, MatButtonModule, TranslatePipe, Button, MatIcon],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
})
export class Ticket {
  public deleteTicket = output<{ card: Card }>();
  public editTicket = output<{ card: Card; statuses: string[] }>();

  public card = input.required<Card>();
  public statuses = input.required<string[]>();
}
