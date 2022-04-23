import { Request, Response } from "express"
import { productStore, product } from "../modules/products.module";
const productsStore = new productStore();




export const index = async (_req: Request, res: Response)=>{
    try{
        const products = await productsStore.index();
        res.json(products)
    }catch(err){
        res.status(400);
        res.json(err)
    }
}
export const show = async (req: Request, res: Response) => {
    try{
        console.log(req.params);
        
    const name = req.params.name
    const product = await productsStore.show(name);
    res.json(product);
    }catch (err) {
      res.status(400);
      res.json(err);
    }
  };
export const  create = async (req: Request, res: Response)=>{
    try{
        
        const product ={
            name:req.body.name,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            offer: req.body.offer,
            image: req.body.image,
        } as product;
        const newProduct = await productsStore.create(product)
        res.send(newProduct)
    }catch (err) {
        res.status(400);
        res.json(err);
      }
}
export const showCate = async (req: Request, res: Response) => {
    try{
        const category = req.params.category
        const product = await productsStore.show(category);
        res.json(product);
    }catch (err) {
      res.status(400);
      res.json(err);
     }
  };