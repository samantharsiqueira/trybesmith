import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

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

export default {
  createProduct,
  listProducts,
};