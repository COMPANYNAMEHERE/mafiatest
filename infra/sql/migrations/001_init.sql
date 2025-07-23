CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  hash TEXT NOT NULL,
  respect INTEGER DEFAULT 0
);

CREATE TABLE missions (
  id SERIAL PRIMARY KEY,
  name TEXT,
  reward_money INTEGER,
  reward_influence INTEGER,
  cooldown_sec INTEGER
);
