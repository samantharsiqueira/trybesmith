import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

chai.use(sinonChai);
const productController = require('../../../src/controllers/productController').default;
const productSchema = require('../../../src/utils/schema').default;
const productService = require('../../../src/services/productService').default;

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return error message when product name is not provided', async () => {

    const product = {
      price: '30 peças de ouro',
      userId: 1,
    };

    const { error: validationError } = productSchema.validate(product);

    expect(validationError).to.not.be.undefined;
    expect(validationError.details[0].message).to.equal('"name" is required');
  });

  it('should return error if the user does not exist', async () => {

    const userExists = sinon.stub(productService, 'userExists').resolves(false);

    const req = {
      body: {
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        userId: 1,
      },
    } as Request;

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"userId" not found' });
  });

  it('should return status ok 200 and a new product', async () => {
      
      const userExists = sinon.stub(productService, 'userExists').resolves(true);
      const createProduct = sinon.stub(productService, 'createProduct').resolves({
        id: 1,
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        userId: 1,
      });
  
      const req = {
        body: {
          name: 'Martelo de Thor',
          price: '30 peças de ouro',
          userId: 1,
        },
      } as Request;
  
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      } as unknown as Response;
  
      await productController.createProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Martelo de Thor',
        price: '30 peças de ouro',
        userId: 1,
      });
    });

    it('should return error message if there is an error creating the product', async () => {
        
        const userExists = sinon.stub(productService, 'userExists').resolves(true);
        const createProduct = sinon.stub(productService, 'createProduct').throws(new Error('Erro ao criar o produto'));
    
        const req = {
          body: {
            name: 'Martelo de Thor',
            price: '30 peças de ouro',
            userId: 1,
          },
        } as Request;
    
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        } as unknown as Response;
    
        await productController.createProduct(req, res);
    
        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ error: 'Erro ao criar o produto'});
      });

      it('should return error message when product price is not provided', async () => {
        const product = {
          name: 'Martelo de Thor',
          userId: 1,
        };
      
        const { error: validationError } = productSchema.validate(product);
      
        expect(validationError).to.not.be.undefined;
        expect(validationError.details[0].message).to.equal('"price" is required');
      });
      
      it('should return error message when userId is not provided', async () => {
        const product = {
          name: 'Martelo de Thor',
          price: '30 peças de ouro',
        };
      
        const { error: validationError } = productSchema.validate(product);
      
        expect(validationError).to.not.be.undefined;
        expect(validationError.details[0].message).to.equal('"userId" is required');
      });

      it('should list all products', async () => {
        const findAllProducts = [
          { id: 1, name: 'Martelo de Thor', price: '30 peças de ouro', userId: 1 },
          { id: 2, name: 'Martelo de Thor 2', price: '40 peças de ouro', userId: 1 },
        ];
      
        sinon.stub(productService, 'listProducts').resolves(findAllProducts);
      
        const req = {} as Request;
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        } as unknown as Response;
      
        await productController.listProducts(req, res);
      
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(findAllProducts);
      });
      
      it('should return error message if there is an error listing the products', async () => {
        sinon.stub(productService, 'listProducts').throws(new Error('Erro ao listar os produtos'));
      
        const req = {} as Request;
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        } as unknown as Response;
      
        await productController.listProducts(req, res);
      
        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ error: 'Erro ao listar os produtos' });
      });
});
