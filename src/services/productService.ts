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

export default {
  createProduct,
};