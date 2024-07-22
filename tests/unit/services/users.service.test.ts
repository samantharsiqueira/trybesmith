import { expect } from 'chai';
import sinon from 'sinon';
import { mockUsers } from '../../mocks/user.mocks';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });


  it('should return all users', function () {
    const usersService = require('../../../src/services/users.service').default;
    const users = usersService.getAllUsers();
    expect(users).to.deep.equal(mockUsers);
  });

});
