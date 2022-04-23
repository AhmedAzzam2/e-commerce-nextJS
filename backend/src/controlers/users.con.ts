import express, { Request, Response } from 'express';
import { userStore, user } from '../modules/users.modules';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretT = process.env.TOKEN_SECRET as unknown as string;
const usersStore = new userStore();

export const index = async (_req: Request, res: Response) => {
  try{
  const users = await usersStore.index();
  res.json(users);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response) => {
  try{
  const user = await usersStore.show(parseInt(req.params.id));
  res.json(user);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user: user = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      id: 0,
    };
    const newUser = await usersStore.create(user);
    var token = jwt.sign({ user: newUser }, secretT);
    res.json({"token": token, "user": newUser});
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const update = async (req: Request, res: Response) => {
  try{
  const user = await usersStore.update(req.body);
  res.json(user);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const destroy = async (req: Request, res: Response) => {
  try{
  const deleted = await usersStore.delete(parseInt(req.params.id));
  res.json(deleted);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const authenticate = async (req: Request, res: Response) => {
  const user: user = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    id: 0,
  };
  try {
    const u = await usersStore.authenticate(user.email, user.password);
    var token = jwt.sign({ user: u }, secretT);
    res.json({token: token, 'user': {u:u} });
    
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
