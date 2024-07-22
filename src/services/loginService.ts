import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import jwtUtil from '../utils/jwtUtil';
import { LoginUser } from '../types';

const login = async ({ username, password }: LoginUser): Promise<string> => {
  const user = await UserModel.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    throw new Error('Username or password invalid');
  }

  const token = jwtUtil.signToken({ id: user.dataValues.id, email: user.dataValues.username });
  return token;
};

export default {
  login,
};