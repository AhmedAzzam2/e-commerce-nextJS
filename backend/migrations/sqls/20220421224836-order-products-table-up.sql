CREATE TABLE order_products  (
    id SERIAL PRIMARY KEY, 
    products_id bigint REFERENCES products(id),
    quantity integer,
    orders_id bigint REFERENCES orders(id)
    );