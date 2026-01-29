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
import {Card, NewCard} from '../../../shared/models/card';
import {BoardService} from '../services/board-service';
import {tapResponse} from '@ngrx/operators';
import {Status, statuses, StatusTotal} from '../../../shared/models/status';

type BoardState = {
  cards: Card[];
  isLoading: boolean;
};

const initialState: BoardState = {
  cards: [],
  isLoading: false,
};

export const BoardStore = signalStore(
  withState(initialState),
  withComputed(({ cards }) => ({
    cardCount: computed(() => cards().length),
    statusTotals: computed<StatusTotal[]>(() => {
      return statuses.map(status => ({
        status: status.toLocaleLowerCase(),
        total: cards().filter(card => card.status === status).length,
      }));
    }),
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
    createCard: rxMethod<NewCard>(
      (newCard$) =>
        newCard$.pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((newCard) =>
            boardService.createCard(newCard).pipe(
              tapResponse({
                next: (card) => {
                  patchState(store, { cards: [...store.cards(), card] });
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
    ),
    getCardsByStatus: (status: Status): Card[] => {
      return store.cards().filter(card => card.status === status);
    },
    updateCardOrder(status: Status, cards: Card[]) {
      const otherCards = store.cards().filter(c => c.status !== status);
      const allCards= [...otherCards, ...cards];
      patchState(store, { cards: allCards })
    }
  }))
);
