import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Card, NewCard } from '../../shared/models/card';
import { Status, statuses, StatusTotal } from '../../shared/models/status';
import { Column } from './components/column/column';
import { Header } from './components/header/header/header';
import { TicketModal } from './components/ticket-modal/ticket-modal';
import { BoardStore } from './store/board.store';

@Component({
  selector: 'app-board-page',
  imports: [Column, Header, MatProgressSpinner],
  templateUrl: './board.page.html',
  styleUrl: './board.page.scss',
})
export class BoardPage {
  public readonly store = inject(BoardStore);
  public readonly translateService = inject(TranslateService);
  public readonly dialog = inject(MatDialog);
  public loading = this.store.isLoading;
  public error = this.store.error;

  protected readonly statuses = statuses;
  private readonly destroyRef = inject(DestroyRef);

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

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((card: NewCard | Card) => {
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
}
