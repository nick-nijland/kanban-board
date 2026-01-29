import {Component, input, output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {Card} from '../../../../shared/models/card';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TranslatePipe} from '@ngx-translate/core';
import {Button} from '../../../../shared/components/button/button';
import {Status} from '../../../../shared/models/status';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-ticket',
  imports: [MatCardModule, MatButtonModule, MatMenuTrigger, MatMenuItem, MatMenu, TranslatePipe, Button, MatIcon],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.scss'],
})
export class Ticket {
  public updateTicket = output<{ card: Card }>();
  public deleteTicket = output<{ card: Card }>();

  public card = input.required<Card>();
  public statuses = input.required<string[]>();


  public updateTicketStatus(status: string): void {
    const updatedCard = {
      ...this.card(),
      status: status as Status,
    }
    this.updateTicket.emit({ card: updatedCard })
  }
}
