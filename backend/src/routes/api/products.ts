import { Router } from "express";
import { create, index, show, showCate } from "../../controlers/products.con";
import { authorization } from "../../middelware/token";



export const productRoutes = Router();
productRoutes.post('/products', create);
productRoutes.get('/products', index);
productRoutes.get('/products/post/:name', show);
productRoutes.get('/products/cat/:category', showCate);