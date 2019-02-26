DROP DATABASE IF EXISTS art_and_prod;

CREATE DATABASE art_and_prod;

\c art_and_prod;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(25) NOT NULL UNIQUE,
  price VARCHAR(10) NOT NULL,
  inventory INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(40) NOT NULL UNIQUE,
  author VARCHAR(50) NOT NULL DEFAULT 'anonymous',
  body text,
  urltitle VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);