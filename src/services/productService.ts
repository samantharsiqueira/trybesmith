import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import UserModel from '../database/models/user.model';

async function createProduct(createNewProduct: ProductInputtableTypes): Promise<Product> {
  const newProductInstance = await ProductModel.create(createNewProduct);

  const newProduct: Product = {
    id: newProductInstance.getDataValue('id'),
    name: newProductInstance.getDataValue('name'),
    price: newProductInstance.getDataValue('price'),
    userId: newProductInstance.getDataValue('userId'),
  };

  return newProduct;
}

async function listProducts(): Promise<Product[]> {
  const products = await ProductModel.findAll();

  return products.map((product) => ({
    id: product.getDataValue('id'),
    name: product.getDataValue('name'),
    price: product.getDataValue('price'),
    userId: product.getDataValue('userId'),
  }));
}

async function userExists(userId: number): Promise<boolean> {
  const user = await UserModel.findByPk(userId);
  return user !== null;
}

export default {
  createProduct,
  listProducts,
  userExists,
};