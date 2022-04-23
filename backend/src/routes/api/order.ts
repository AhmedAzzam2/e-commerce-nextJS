import { Router } from 'express';
import { index, show, create, addProduct, getOrder} from '../../controlers/orders';
import { authorization } from '../../middelware/token';

const orderRoutes = Router();

orderRoutes.get('/orders', authorization,index);
orderRoutes.get('/orders/:id', authorization, show);
orderRoutes.post('/orders', authorization, create);
orderRoutes.post('/orders/:id/products', authorization, addProduct)
orderRoutes.get('/orders/users/:id', authorization,getOrder);
export default orderRoutes;
