import { expect } from 'chai';
import sinon from 'sinon';
import { mockUsers } from '../../mocks/user.mocks';
import { findAllProducts } from '../../mocks/products.mocks';
import userController from '../../../src/controllers/userController';
import userService from '../../../src/services/userService';
import UserModel from '../../../src/database/models/user.model';
import ProductModel from '../../../src/database/models/product.model';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });


  it('should return all users', function () {
    const usersService = require('../../../src/services/users.service').default;
    const users = usersService.getAllUsers();
    expect(users).to.deep.equal(mockUsers);
  });

  it('should return users with their respective product IDs', async () => {
    sinon.stub(UserModel, 'findAll').resolves(mockUsers as any);
    sinon.stub(ProductModel, 'findAll').resolves(findAllProducts as any);

    const result = await userService.getUsers();
    expect(result).to.deep.equal([
      { username: 'user1', productIds: [1, 2] },
      { username: 'user2', productIds: [3] },
    ]);
  });

  it('should return users with empty product IDs when there are no products', async () => {
    sinon.stub(UserModel, 'findAll').resolves(mockUsers as any);
    sinon.stub(ProductModel, 'findAll').resolves([]);

    const result = await userService.getUsers();
    expect(result).to.deep.equal([
      { username: 'user1', productIds: [] },
      { username: 'user2', productIds: [] },
    ]);
  });

  it('should return users with empty product IDs when users have no associated products', async () => {
    const mockUsersWithNoProducts = [
      { dataValues: { id: 3, username: 'user3' } },
    ];
    sinon.stub(UserModel, 'findAll').resolves(mockUsersWithNoProducts as any);
    sinon.stub(ProductModel, 'findAll').resolves(findAllProducts as any);

    const result = await userService.getUsers();
    expect(result).to.deep.equal([
      { username: 'user3', productIds: [] },
    ]);
  });

});
