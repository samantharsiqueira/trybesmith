import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/loginController';
import { ERROR_MSG, HTTP_STATUS } from '../../../src/utils';
import loginService from '../../../src/services/loginService';

chai.use(sinonChai);

describe('LoginController', function () {
  let req: Request;
  let res: Response;

  beforeEach(function () {
    req = {} as Request;
    res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return error message when username is not provided', async () => {
    req.body = {
      password: 'password123',
    };

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG.USERNAME_PASSWORD_REQUIRED });
  });

  it('should return error message when password is not provided', async () => {
    req.body = {
      username: 'user1',
    };

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG.USERNAME_PASSWORD_REQUIRED });
  });

  it('should return token when login is successful', async () => {
    req.body = {
      username: 'user1',
      password: 'password123',
    };

    const token = 'fake-jwt-token';
    sinon.stub(loginService, 'login').resolves(token);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.OK);
    expect(res.json).to.have.been.calledWith({ token });
  });

  it('should return error message when login fails due to invalid credentials', async () => {
    req.body = {
      username: 'user1',
      password: 'wrongpassword',
    };

    sinon.stub(loginService, 'login').throws(new Error(ERROR_MSG.USERNAME_PASSWORD_INVALID));

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(HTTP_STATUS.UNAUTHORIZED);
    expect(res.json).to.have.been.calledWith({ message: ERROR_MSG.USERNAME_PASSWORD_INVALID });
  });

});
