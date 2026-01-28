import { http, HttpResponse } from 'msw';
import {Card} from "../app/shared/models/card";
import cards from './cards.json';

export const handlers = [
    http.get('/api/tickets', () => {
      return HttpResponse.json<Card[]>(cards as Card[]);
    }),

    // http.post('/api/login', async ({ request }) => {
    //     const body = await request.json();
    //
    //     if (body.username === 'admin') {
    //         return HttpResponse.json({ token: 'fake-jwt-token' });
    //     }
    //
    //     return new HttpResponse('Unauthorized', { status: 401 });
    // }),
];
