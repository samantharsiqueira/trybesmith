import { username } from '../database/config/database';
import UserModel, { UserInputtableTypes } from '../database/models/user.model';

async function listUsers(): Promise<User[]> {
  const users = await UserModel.findAll();

  return users.map((user) => ({
    username: users.getDataValue.('name');
    
  }))
}