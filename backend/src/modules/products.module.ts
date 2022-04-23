import { client } from "../database";

export type product ={
  name: string;
  price: number;
  category: string;
  stock: number;
  offer: string;
  image: string;
}

export class productStore{
  async index(): Promise<product[]>{
    try{
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'
      const result =  await conn.query(sql)
      conn.release()
      return result.rows
    }catch(err){
      throw new Error (`Could not get products. Error: ${err}`)
    }
  }
  async show(name: string): Promise<product> {
    try{
      const conn =await client.connect()
      const sql = 'SELECT * FROM products WHERE name=($1)'
      const result = await conn.query(sql, [name])
      conn.release()
      return result.rows[0]
    }catch(err){
      throw new Error(`Could not find product ${name}. Error: ${err}`)
    }
  }
  async showByCate(category: string): Promise<product> {
    try{
      const conn =await client.connect()
      const sql = 'SELECT name FROM products WHERE category=($1)'
      const result = await conn.query(sql, [category])
      conn.release()
      return result.rows[0]
    }catch(err){
      throw new Error(`Could not find product ${category}. Error: ${err}`)
    }
  }
  async create(p: product): Promise<product> {
      try{
          const conn = await client.connect()
          const sql = 'INSERT INTO products (name, price, category,stock,offer,image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
          const result = await conn.query(sql, [p.name, p.price, p.category, p.stock, p.offer, p.image]);
          conn.release();
          return result.rows[0];
      }catch(err){
        throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
      }

    }
}