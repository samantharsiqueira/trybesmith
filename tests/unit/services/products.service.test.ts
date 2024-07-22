import { expect } from 'chai';
import sinon from 'sinon';
import { findAllProducts, addNewProduct, addNewProductWithId, findAllProductsWithMethods } from '../../mocks/products.mocks';
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import productService from '../../../src/services/productService';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should create a new product', async function () {
    sinon.stub(ProductModel, 'create').resolves(addNewProductWithId as any);

    const result = await productService.createProduct(addNewProduct);
    expect(result).to.deep.equal(addNewProductWithId);
  });

  it('should list all products', async function () {
    sinon.stub(ProductModel, 'findAll').resolves(findAllProductsWithMethods as any);

    const result = await productService.listProducts();
    expect(result).to.deep.equal(findAllProductsWithMethods.map(product => ({
      id: product.getDataValue('id'),
      name: product.getDataValue('name'),
      price: product.getDataValue('price'),
      userId: product.getDataValue('userId'),
    })));
  });

  it('should return true if user exists', async function () {
    sinon.stub(UserModel, 'findByPk').resolves({ id: 1 } as any);

    const result = await productService.userExists(1);
    expect(result).to.be.true;
  });

  it('should return false if user does not exist', async function () {
    sinon.stub(UserModel, 'findByPk').resolves(null);

    const result = await productService.userExists(99);
    expect(result).to.be.false;
  });
});
