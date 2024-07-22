import { Request, Response } from 'express';
import productService from '../services/productService';
import productSchema from '../utils/schema';
import { ERROR_MSG, HTTP_STATUS } from '../utils';

async function createProduct(req: Request, res: Response): Promise<Response> {
  const { error: validationError } = productSchema.validate(req.body);
  if (validationError) {
    const { message } = validationError.details[0];
    const status = message
      .includes('required') ? HTTP_STATUS.BAD_REQUEST : HTTP_STATUS.UNPROCESSABLE_ENTITY;
    return res.status(status).json({ message });
  }

  const { name, price, userId } = req.body;

  const userExists = await productService.userExists(userId); if (!userExists) {
    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
      .json({ message: ERROR_MSG.USER_ID_NOT_FOUND });
  }

  try {
    const newProduct = await productService.createProduct({ name, price, userId });
    return res.status(HTTP_STATUS.CREATED).json(newProduct);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao criar o produto' });
  }
}

async function listProducts(req: Request, res: Response): Promise<Response> {
  try {
    const products = await productService.listProducts();
    return res.status(HTTP_STATUS.OK).json(products);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Erro ao listar os produtos' });
  }
}

export default {
  createProduct,
  listProducts,
};
