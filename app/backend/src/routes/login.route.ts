import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/Users.controller';
import Authentication from '../middlewares/Authentication';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

loginRouter.get(
  '/role',
  Authentication.validateToken,
  (req: Request, res: Response) => userController.getRole(req, res),
);

export default loginRouter;
