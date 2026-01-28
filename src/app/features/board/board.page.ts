import {Component, inject} from '@angular/core';
import {Column} from './components/column/column';
import {BoardStore} from './store/board.store';
import {Status, statuses} from '../../shared/models/status';
import {Card} from '../../shared/models/card';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-page',
  imports: [
    Column
  ],
  templateUrl: './board.page.html',
  styleUrl: './board.page.scss',
})
export class BoardPage {
  public readonly store = inject(BoardStore);

  constructor() {
    this.store.loadAll();
  }

  public getCardsByStatus(status: Status): Card[] {
    return this.store.getCardsByStatus(status);
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


  protected readonly statuses = statuses;
}
