import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

async function loop() {
  const now = Date.now();
  // TODO: read from sorted set where next_payout_at <= now
  console.log('worker tick', new Date(now).toISOString());
}

setInterval(loop, 60000);
