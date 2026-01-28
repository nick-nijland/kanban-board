import { http, HttpResponse } from 'msw';
import {Card} from "../app/shared/models/card";

export const handlers = [
    http.get('/api/tickets', () => {
        return HttpResponse.json<Card[]>([
            {
                title: 'Test',
                description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolore',
                status: "TODO"
            },
        ]);
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
