import express from 'express';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(loginRouter);

export default app;
