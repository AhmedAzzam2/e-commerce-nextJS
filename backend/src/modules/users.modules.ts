import { client } from "../database";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
export type user = {
    id: number;
    email: string;
    name: string;
    password: string;
  };

  export class userStore {
    async index(): Promise<user[]> {
      try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users';
  
        const result = await conn.query(sql);
  
        conn.release();
  
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`);
      }
    }
  
    async show(id: number): Promise<user> {
      try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
  
        conn.release();
  
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`);
      }
    }
  
    async create(u: user): Promise<user> {
      try {
        const conn = await client.connect();
        const sql =
          'INSERT INTO users (email, name, password_digest) VALUES($1, $2, $3) RETURNING *';
        const hash = bcrypt.hashSync(
          u.password + pepper,
          parseInt(saltRounds as string)
        );
        const result = await conn.query(sql, [u.email, u.name, hash]);
        conn.release();
  
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not add new user ${u.name}. Error: ${err}`);
      }
    }
  
    async update(u: user): Promise<user> {
      try {
        const conn = await client.connect();
        const sql =
          'UPDATE users SET email=$1, name=$2,  password_digest=$3 WHERE id=$4 RETURNING *';
        const result = await conn.query(sql, [
          u.email,
          u.name,
          u.password,
          u.id,
        ]);
  
        const user = result.rows[0];
  
        conn.release();
  
        return user;
      } catch (err) {
        throw new Error(`Could not update user ${u.id}. Error: ${err}`);
      }
    }
  
    async delete(id: number): Promise<user> {
      try {
        const conn = await client.connect();
        const sql = 'DELETE FROM users WHERE id=($1)';
        const result = await conn.query(sql, [id]);
  
        const user = result.rows[0];
  
        conn.release();
  
        return user;
      } catch (err) {
        throw new Error(`Could not delete email ${id}. Error: ${err}`);
      }
    }
    async authenticate(
      email: string,
      password: string
    ): Promise<user | null> {
      const conn = await client.connect();
      const sql = 'SELECT name, id, password_digest FROM users WHERE email=($1)';
      const result = await conn.query(sql, [email]);
      if (result.rows.length) {
        const user = result.rows[0];
  
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          
          return user;
        }
      }
      conn.release();
      return null;
    }
  }