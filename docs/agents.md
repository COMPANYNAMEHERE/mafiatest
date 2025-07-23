# Optimisation & Scaling

Empire Noir uses Redis-backed worker processes to handle passive income, mission timers and territory battles. Workers read from Redis streams and process jobs.

- Configure number of workers via `WORKER_COUNT` environment variable for horizontal scaling.
- Payout scheduling uses a Redis sorted set keyed by `next_payout_at` timestamps for efficient lookups.
- For larger deployments, consider migrating PostgreSQL to CockroachDB for automatic sharding and resilience.
