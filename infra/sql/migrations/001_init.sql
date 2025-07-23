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

CREATE TABLE families (
  id SERIAL PRIMARY KEY,
  name TEXT,
  crest TEXT
);

CREATE TABLE user_families (
  user_id INTEGER REFERENCES users(id),
  family_id INTEGER REFERENCES families(id),
  role TEXT,
  PRIMARY KEY (user_id, family_id)
);

CREATE TABLE territories (
  id SERIAL PRIMARY KEY,
  grid_x INTEGER,
  grid_y INTEGER,
  owner_id INTEGER REFERENCES users(id),
  bonus TEXT
);

CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type TEXT,
  level INTEGER,
  next_payout_at TIMESTAMPTZ
);

CREATE TABLE mission_runs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  mission_id INTEGER REFERENCES missions(id),
  complete_at TIMESTAMPTZ
);

CREATE TABLE battles (
  id SERIAL PRIMARY KEY,
  attacker_id INTEGER REFERENCES users(id),
  defender_id INTEGER REFERENCES users(id),
  territory_id INTEGER REFERENCES territories(id),
  result TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
