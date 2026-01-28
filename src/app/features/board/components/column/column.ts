import {Component, computed, input} from '@angular/core';
import {Status, STATUS_I18N_KEYS, statuses} from '../../../../shared/models/status';
import {Card} from '../../../../shared/models/card';
import {Ticket} from '../card/ticket';

@Component({
  selector: 'app-column',
  imports: [Ticket],
  templateUrl: './column.html',
  styleUrl: './column.scss',
})
export class Column {
  public status = input.required<Status>();
  public cards = input.required<Card[]>();
  public statusI18nKey = computed(() => STATUS_I18N_KEYS[this.status()]);

  protected readonly statuses = statuses;
}
