import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/Users.Service';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.login(email, password);
    res.status(mapStatusHTTP(status)).json(data);
  }

  getRole(req: Request, res: Response) {
    this.getRole = this.getRole.bind(this);
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}
