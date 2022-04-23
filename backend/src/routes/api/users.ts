import { Router } from 'express';
import {
  create,
  index,
  show,
  destroy,
  authenticate,
  update,
} from '../../controlers/users.con';
import { authorization } from '../../middelware/token';

const userRoutes = Router();
userRoutes.post('/users', create);
userRoutes.get('/users', authorization, index);
userRoutes.get('/users/:id', authorization, show);
userRoutes.post('/update', authorization, update);
userRoutes.delete('/users/:id', authorization, destroy);
userRoutes.post('/signin', authenticate);

export default userRoutes;
