import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { Server } from 'socket.io';

const app = Fastify();
import businessRoutes from "./routes/business";
app.register(fastifyJwt, { secret: 'change_me' });

app.register(businessRoutes);

app.post('/auth/login', async (req, reply) => {
  // TODO validate user
  const token = app.jwt.sign({ user: 'demo' });
  return { token };
});

app.get('/sync', async () => {
  return { money: 0, influence: 0, respect: 0 };
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
