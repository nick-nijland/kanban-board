import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Card, NewCard } from '../../../shared/models/card';
import { BoardService } from '../services/board-service';
import { tapResponse } from '@ngrx/operators';
import { Status, statuses, StatusTotal } from '../../../shared/models/status';
import { TranslateService } from '@ngx-translate/core';

type BoardState = {
  cards: Card[];
  isLoading: boolean;
  error: string | undefined;
};

const initialState: BoardState = {
  cards: [],
  isLoading: false,
  error: undefined,
};

export const BoardStore = signalStore(
  withState(initialState),
  withComputed(({ cards }) => ({
    cardCount: computed(() => cards().length),
    statusTotals: computed<StatusTotal[]>(() => {
      return statuses.map((status) => ({
        status: status.toLocaleLowerCase(),
        total: cards().filter((card) => card.status === status).length,
      }));
    }),
  })),
  withMethods(
    (store, boardService = inject(BoardService), translateService = inject(TranslateService)) => {
      const loadAll = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: undefined })),
          switchMap(() => {
            return boardService.getCards().pipe(
              tapResponse({
                next: (cards) => patchState(store, { cards }),
                error: () =>
                  patchState(store, { error: translateService.instant('board.error.loaded') }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            );
          }),
        ),
      );

      const createCard = rxMethod<NewCard>((newCard$) =>
        newCard$.pipe(
          tap(() => patchState(store, { isLoading: true, error: undefined })),
          switchMap((newCard) =>
            boardService.createCard(newCard).pipe(
              tapResponse({
                next: () => {
                  loadAll();
                },
                error: () =>
                  patchState(store, { error: translateService.instant('board.error.create') }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      );

      const updateCard = rxMethod<[Card, number[]?]>((updateCard$) =>
        updateCard$.pipe(
          tap(() => patchState(store, { isLoading: true, error: undefined })),
          switchMap(([card, indexes]) =>
            boardService.updateCard(card, indexes).pipe(
              tapResponse({
                next: () => {
                  loadAll();
                },
                error: () =>
                  patchState(store, { error: translateService.instant('board.error.update') }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      );

      const deleteCard = rxMethod<Card>((deletedCard$) =>
        deletedCard$.pipe(
          tap(() => patchState(store, { isLoading: true, error: undefined })),
          switchMap((card) =>
            boardService.deleteCard(card).pipe(
              tapResponse({
                next: () => {
                  loadAll();
                },
                error: () =>
                  patchState(store, { error: translateService.instant('board.error.delete') }),
                finalize: () => patchState(store, { isLoading: false }),
              }),
            ),
          ),
        ),
      );

      const getCardsByStatus = (status: Status): Card[] => {
        return store.cards().filter((card) => card.status === status);
      };

      const updateCardOrder = (status: Status, cards: Card[]) => {
        const otherCards = store.cards().filter((c) => c.status !== status);
        const allCards = [...otherCards, ...cards];
        patchState(store, { cards: allCards });
      };

      return {
        loadAll,
        createCard,
        updateCard,
        deleteCard,
        getCardsByStatus,
        updateCardOrder,
      };
    },
  ),
);
