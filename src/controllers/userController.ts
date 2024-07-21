import { Request, Response } from 'express';
import userService from '../services/userService';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os usuários' });
  }
};

export default {
  getUsers,
};