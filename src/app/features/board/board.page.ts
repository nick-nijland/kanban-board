import {Component, inject} from '@angular/core';
import {Column} from './components/column/column';
import {BoardStore} from './store/board.store';
import {Status, statuses, StatusTotal} from '../../shared/models/status';
import {Card, NewCard} from '../../shared/models/card';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Header} from './components/header/header/header';
import { MatDialog } from '@angular/material/dialog';
import {TicketModal} from './components/ticket-modal/ticket-modal';

@Component({
  selector: 'app-board-page',
  imports: [
    Column,
    Header
  ],
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
    return this.statuses.filter(state => state !== status);
  }

  public dropCard(event: CdkDragDrop<Card[]>, targetStatus: Status) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.store.updateCardOrder(targetStatus, event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      movedCard.status = targetStatus;

      this.store.updateCardOrder(event.previousContainer.data[0]?.status!, event.previousContainer.data);
      this.store.updateCardOrder(targetStatus, event.container.data);
    }
  }

  public openModal(event?: { card: Card }): void {
    const dialogRef = this.dialog.open(TicketModal, {
      width: '400px',
      data: event?.card ?? undefined,
    });

    dialogRef.afterClosed().subscribe((result: NewCard | undefined) => {
      if (result) {
        this.store.createCard(result)
      }
    });
  }

  public updateTicket(event: { card: Card }): void {
    this.store.updateCard(event.card);
  }

  public deleteTicket(event: { card: Card }): void {
    this.store.deleteCard(event.card);
  }

  protected readonly statuses = statuses;
}
