import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function routes(app: FastifyInstance) {
  app.post('/business', async (req) => {
    const schema = z.object({ type: z.string(), level: z.number().int() });
    const body = schema.parse(req.body as any);
    await app.db.query(
      'INSERT INTO businesses (user_id, type, level) VALUES ($1,$2,$3)',
      [1, body.type, body.level]
    );
    return { success: true, business: body };
  });
}
