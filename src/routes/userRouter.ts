import express from 'express';
import userController from '../controllers/userController';
import { ROUTE } from '../utils/index';

const userRouter = express.Router();

userRouter.get(ROUTE.USER, userController.getUsers);

export default userRouter;