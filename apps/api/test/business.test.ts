import { test, expect } from 'vitest';
import Fastify from 'fastify';
import businessRoutes from '../src/routes/business';

test('POST /business', async () => {
  const app = Fastify();
  app.decorate('db', {
    query: async () => ({ rows: [] })
  } as any);
  await app.register(businessRoutes);
  const res = await app.inject({
    method: 'POST',
    url: '/business',
    payload: { type: 'speakeasy', level: 1 }
  });
  expect(res.statusCode).toBe(200);
});
