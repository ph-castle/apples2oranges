DROP DATABASE IF EXISTS CardGame;
CREATE DATABASE CardGame;

\c cardgame;

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(200),
  password VARCHAR(200),
  avatar VARCHAR(500)
);

CREATE TABLE prompts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  body VARCHAR(500) NOT NULL,
  user_id INTEGER DEFAULT NULL REFERENCES users(id),
  NSFW BOOLEAN NOT NULL
);

CREATE TABLE answers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  body VARCHAR(500) NOT NULL,
  user_id INTEGER DEFAULT NULL REFERENCES users(id),
  NSFW BOOLEAN NOT NULL
);

\COPY prompts(body, NSFW) FROM '/Users/roycechun/Desktop/RFP2205/apples2oranges/db/schemas/data/prompts.csv' CSV HEADER;

\COPY answers(body, NSFW) FROM '/Users/roycechun/Desktop/RFP2205/apples2oranges/db/schemas/data/answers.csv' CSV HEADER;

CREATE INDEX user_id_index ON users USING HASH (id);


