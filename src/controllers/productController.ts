import { Request, Response } from 'express';
import productService from '../services/productService';
import productSchema from '../utils/schema';
import { ERROR_MSG, HTTP_STATUS } from '../utils';

async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const { name, price, userId } = req.body;
    const newProduct = await productService.createProduct({ name, price, userId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
}

async function listProducts(req: Request, res: Response): Promise<void> {
  try {
    const products = await productService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os produtos' });
  }
}

export default {
  createProduct,
  listProducts,
};
