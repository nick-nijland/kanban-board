import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json([
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
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
