import { Request, Response } from 'express';
import userService from '../services/userService';
import { HTTP_STATUS } from '../utils';

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const findAllUsers = await userService.getUsers();
  return res.status(HTTP_STATUS.OK).json(findAllUsers);
};

export default {
  getUsers,
};