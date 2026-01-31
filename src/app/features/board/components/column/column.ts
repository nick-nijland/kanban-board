import { Component, computed, input, output, Output } from '@angular/core';
import { Status, statuses } from '../../../../shared/models/status';
import { Card } from '../../../../shared/models/card';
import { Ticket } from '../ticket/ticket';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-column',
  imports: [Ticket, CdkDrag, CdkDropList, TranslatePipe],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  public cardDropped = output<CdkDragDrop<Card[]>>();
  public onDeleteTicket = output<{ card: Card }>();
  public onEditTicket = output<{ card: Card; statuses: string[] }>();

  public status = input.required<Status>();
  public cards = input.required<Card[]>();
  public connectedTo = input.required<Status[]>();

  public idPrefix = 'cdk-drop-list-';

  public onDrop(event: CdkDragDrop<Card[]>) {
    this.cardDropped.emit(event);
  }

  public getConnectedTo(): string[] {
    return this.connectedTo().map((status) => this.idPrefix + status);
  }
}
