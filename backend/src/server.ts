import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { productRoutes } from './routes/api/products';
import userRoutes from './routes/api/users';
import orderRoutes from './routes/api/order';

const app: express.Application = express();
dotenv.config();

app.use(express.json());

app.use(cors());


//end points 
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);


const port = process.env.port;
app.listen(port, () => {
  console.log(`listening on port:${port}`);
});