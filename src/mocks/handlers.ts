import { http, HttpResponse } from 'msw';
import {Card, NewCard} from "../app/shared/models/card";
import cards from './cards.json';

export const handlers = [
    http.get('/api/tickets', () => {
      return HttpResponse.json<Card[]>(cards as Card[]);
    }),

    http.post('/api/tickets', async ({ request }) => {
      const newCard = (await request.json()) as NewCard;
      const card: Card = {
        title: newCard.title,
        description: newCard.description,
        status: "TODO",
        id: cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1, // Usually a BE will determine this, but for this assesment we're mocking.
      }
      cards.push(card);
      return HttpResponse.json<Card>(card, { status: 201 });
    }),

  http.put('/api/tickets/:id', async ({ request }) => {
    const updatedCard = (await request.json()) as Card;
    const index = cards.findIndex(card => card.id === updatedCard.id);

    if (index === -1) {
      return HttpResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    const existingCard = cards[index];

    if (existingCard.status === updatedCard.status) {
      cards[index] = updatedCard;
    } else {
      cards.splice(index, 1);
      cards.push(updatedCard);
    }

    return HttpResponse.json<Card>(updatedCard, { status: 200 });
  }),

  http.delete('/api/tickets/:id', ({ params }) => {
      const id = Number(params['id']);
      const index = cards.findIndex(card => card.id === id)
      cards.splice(index, 1);
      return HttpResponse.json<Card>(undefined, { status: 201 });
    })

];
