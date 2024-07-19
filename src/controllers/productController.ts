import { Request, Response } from 'express';
import productService from '../services/productService';

async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const { name, price, userId } = req.body;
    const newProduct = await productService.createProduct({ name, price, userId });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o produto' });
  }
}

export default {
  createProduct,
};