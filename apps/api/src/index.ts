import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { Server } from 'socket.io';
import { Client } from 'pg';
import { z } from 'zod';

const app = Fastify();
const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
import businessRoutes from './routes/business';
declare module 'fastify' {
  interface FastifyInstance {
    db: Client;
  }
}
app.decorate('db', db);
app.register(fastifyJwt, { secret: 'change_me' });

app.register(businessRoutes);

app.post('/auth/login', async (req, reply) => {
  const schema = z.object({ email: z.string().email(), password: z.string() });
  const body = schema.parse(req.body as any);
  const res = await db.query('SELECT id, hash FROM users WHERE email=$1', [body.email]);
  const user = res.rows[0];
  if (!user || user.hash !== body.password) {
    return reply.status(401).send({ error: 'invalid credentials' });
  }
  const token = app.jwt.sign({ userId: user.id });
  return { token };
});

app.get('/sync', async (req) => {
  const auth = await req.jwtVerify<{ userId: number }>().catch(() => null);
  if (!auth) return { money: 0, influence: 0, respect: 0 };
  const res = await db.query('SELECT respect FROM users WHERE id=$1', [auth.userId]);
  return { money: 0, influence: 0, respect: res.rows[0]?.respect ?? 0 };
});

const server = app.server;
const io = new Server(server);

io.on('connection', (socket) => {
  socket.emit('update', { msg: 'welcome' });
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`API running at ${address}`);
});
