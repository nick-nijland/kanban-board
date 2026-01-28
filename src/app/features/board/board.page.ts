import {Component, inject} from '@angular/core';
import {Column} from './components/column/column';
import {BoardStore} from './store/board.store';
import {Status, statuses} from '../../shared/models/status';
import {Card} from '../../shared/models/card';

@Component({
  selector: 'app-board-page',
  imports: [
    Column,
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

  protected readonly statuses = statuses;
}
