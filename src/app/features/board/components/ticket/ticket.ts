import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Button } from '../../../../shared/components/button/button';
import { Card } from '../../../../shared/models/card';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, MatButtonModule, TranslatePipe, Button, MatIcon, TruncatePipe],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
})
export class Ticket {
  public deleteTicket = output<{ card: Card }>();
  public editTicket = output<{ card: Card; statuses: string[] }>();

  public card = input.required<Card>();
  public statuses = input.required<string[]>();
}
