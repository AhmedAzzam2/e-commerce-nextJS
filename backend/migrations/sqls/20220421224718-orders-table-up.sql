CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    users_id bigint REFERENCES users(id),
    status VARCHAR(15));