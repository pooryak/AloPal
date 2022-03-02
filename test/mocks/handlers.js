import { rest } from 'msw';

export const handlers = [
    rest.post('/api/login/plain', (req, res, ctx) => res(
        ctx.json([
            {
                name: 'text', path: 'test',
            },
        ]),
    )),
];
