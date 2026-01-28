import { computed, inject } from '@angular/core';
import {
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {Card} from '../../../shared/models/card';
import {BoardService} from '../services/board-service';
import {tapResponse} from '@ngrx/operators';
import {Status} from '../../../shared/models/status';

type BoardState = {
  cards: Card[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BoardState = {
  cards: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BoardStore = signalStore(
  withState(initialState),
  withComputed(({ cards }) => ({
    cardCount: computed(() => cards().length),
  })),
  withMethods((store, boardService = inject(BoardService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return boardService.getCards().pipe(
            tapResponse({
              next: (cards) => patchState(store, { cards }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    getCardsByStatus: (status: Status): Card[] => {
      return store.cards().filter(card => card.status === status);
    },
  }))
);
