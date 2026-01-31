import { Component, inject } from '@angular/core';
import { Column } from './components/column/column';
import { BoardStore } from './store/board.store';
import { Status, statuses, StatusTotal } from '../../shared/models/status';
import { Card, NewCard } from '../../shared/models/card';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Header } from './components/header/header/header';
import { MatDialog } from '@angular/material/dialog';
import { TicketModal } from './components/ticket-modal/ticket-modal';

@Component({
  selector: 'app-board-page',
  imports: [Column, Header],
  templateUrl: './board.page.html',
  styleUrl: './board.page.scss',
})
export class BoardPage {
  public readonly store = inject(BoardStore);
  public readonly dialog = inject(MatDialog);
  public loading = this.store.isLoading;

  constructor() {
    this.store.loadAll();
  }

  public getCardsByStatus(status: Status): Card[] {
    return this.store.getCardsByStatus(status);
  }

  public getStatusTotals(): StatusTotal[] {
    return this.store.statusTotals();
  }

  public getStatusses(status: Status): Status[] {
    return this.statuses.filter((state) => state !== status);
  }

  public dropCard(event: CdkDragDrop<Card[]>, targetStatus: Status) {
    const card = {
      ...event.item.data,
      status: targetStatus,
    };
    this.store.updateCard([card, [event.previousIndex, event.currentIndex]]);
  }

  public openModal(event?: { card: Card; statuses: string[] }): void {
    const dialogRef = this.dialog.open(TicketModal, {
      width: '400px',
      data: event ?? undefined,
    });

    dialogRef.afterClosed().subscribe((card: NewCard | Card) => {
      if (card) {
        if ('id' in card) {
          this.store.updateCard([card]);
        } else {
          this.store.createCard(card);
        }
      }
    });
  }

  public deleteTicket(event: { card: Card }): void {
    this.store.deleteCard(event.card);
  }

  protected readonly statuses = statuses;
}
