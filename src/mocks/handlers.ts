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
    return HttpResponse.json<Card>(card, { status: 201 });
  })

];
