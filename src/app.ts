import express from 'express';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);

export default app;
