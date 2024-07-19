import express from 'express';
import productController from '../controllers/productController';
import { ROUTE } from '../utils/index';

const productRouter = express.Router();

productRouter.post(ROUTE.PRODUCTS, productController.createProduct);

export default productRouter;