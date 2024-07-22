import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userController from '../../../src/controllers/userController';
import userService from '../../../src/services/userService';
import { HTTP_STATUS } from '../../../src/utils';
import { mockUsers } from '../../mocks/user.mocks';
import { findAllProducts } from '../../mocks/products.mocks';
chai.use(sinonChai);

describe('UsersController', function () {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: sinon.SinonStub;
  let jsonStub: sinon.SinonStub;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    statusStub = res.status as sinon.SinonStub;
    jsonStub = res.json as sinon.SinonStub;
  });

  it('should return status OK-200 and a users list', async () => {
    // Erro de tipagem se eu uso meu mock mesmo sendo igual a esse, pq?
    const mockUsers = [
      { username: 'user1', productIds: [1, 2] },
      { username: 'user2', productIds: [3] },
    ];

    sinon.stub(userService, 'getUsers').resolves(mockUsers);

    await userController.getUsers(req as Request, res as Response);

    expect(statusStub.calledWith(200)).to.be.true;
    expect(jsonStub.calledWith(mockUsers)).to.be.true;

    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });
});