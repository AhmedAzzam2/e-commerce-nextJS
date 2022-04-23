CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    price integer NOT NULL,
    category VARCHAR(100),
    stock integer NOT NULL,
    offer VARCHAR(100),
    image VARCHAR(255)
);