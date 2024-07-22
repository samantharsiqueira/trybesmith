import { Request, Response } from 'express';
import loginService from '../services/loginService';  
import { HTTP_STATUS, ERROR_MSG } from '../utils';

const login = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: ERROR_MSG.USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const token = await loginService.login({ username, password });
    return res.status(HTTP_STATUS.OK).json({ token });
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: ERROR_MSG.USERNAME_PASSWORD_INVALID });
  }
};

export default {
  login,
};