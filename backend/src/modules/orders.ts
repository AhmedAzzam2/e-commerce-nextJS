import {client} from '../database';

export type order = {
  id: number;
  users_id: number;
  status: string;
};
export class orderStore {
  async show(id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql = ' SELECT * FROM orders WHERE id=($1) ';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }
  async index(): Promise<order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async create(o: order): Promise<order> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO orders ( users_id, status) VALUES($1, $2) RETURNING *';

      const result = await conn.query(sql, [
        o.users_id,
        o.status,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order . Error: ${err}`);
    }
  }
  async addProduct(products_id: number, quantity: number, orders_id: number ): Promise<order> {
    try {
      const sql = 'INSERT INTO order_products (products_id, quantity, orders_id ) VALUES($1, $2, $3) RETURNING *'
     
      const conn = await client.connect()

      const result = await conn
          .query(sql, [products_id, quantity, orders_id])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${products_id} to order ${orders_id}: ${err}`)
    }
  }
  async getOrder(users_id: number): Promise<order> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT * FROM orders  INNER JOIN order_products ON orders.id = order_products.id WHERE orders.users_id=($1)';

      const result = await conn.query(sql, [users_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not get order of user id ${users_id}: ${err}`);
    }
  }
}
