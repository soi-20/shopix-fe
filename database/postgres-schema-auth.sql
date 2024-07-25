CREATE TYPE AuthRole AS ENUM ('USER', 'ADMIN');

CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  role AuthRole NOT NULL DEFAULT 'USER'
);

CREATE TABLE IF NOT EXISTS accounts (
  id BIGSERIAL PRIMARY KEY,
  "userId" BIGINT NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    rating FLOAT,
    price DECIMAL(10, 2) NOT NULL,
    logo TEXT,
    link TEXT,
    site_id UUID,
    site_name VARCHAR(255),
    brand_name VARCHAR(255),
    delivery VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE
);



CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY,
  user_id BIGINT NOT NULL,
  product_id UUID NOT NULL,
  added_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE (user_id, product_id)  -- Ensure that each user can only have one entry per product
);
