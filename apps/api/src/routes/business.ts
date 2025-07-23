import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function routes(app: FastifyInstance) {
  app.post('/business', async (req, reply) => {
    const schema = z.object({ type: z.string(), level: z.number().int() });
    const body = schema.parse(req.body);
    // TODO persist to DB
    return { success: true, business: body };
  });
}
