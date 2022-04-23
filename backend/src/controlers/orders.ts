import { Request, Response } from 'express';
import { order, orderStore } from '../modules/orders';

const ordersStore = new orderStore();

export const show = async (req: Request, res: Response) => {
  try{
  const order = await ordersStore.show(parseInt(req.params.id));
  res.json(order);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const index = async (_req: Request, res: Response) => {
  try{
  const orders = await ordersStore.index();
  res.json(orders);
  }catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const order = {
      users_id: parseInt( req.body.users_id),
      status: req.body.status,
    } as order;

    const newOrder = await ordersStore.create(order);
    res.send(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const addProduct = async (_req: Request, res: Response) => {

  const products_id: number = _req.body.products_id
  const quantity: number = _req.body.quantity
  const orders_id: number =parseInt(_req.params.id)

  try {
    const addedProduct = await ordersStore.addProduct(products_id, quantity, orders_id)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 
export const getOrder = async (req: Request, res: Response) => {
  try {
    const users_id = parseInt(req.params.id);
    const theorder = await ordersStore.getOrder(users_id);
    res.json(theorder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
