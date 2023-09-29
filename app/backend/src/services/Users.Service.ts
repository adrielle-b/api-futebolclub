import * as bcrypt from 'bcryptjs';
import JWT from '../utils/jwt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UsersModel from '../models/Users.Model';
import IUserModel from '../Interfaces/UsersModel';

export default class UsersService {
  constructor(
    private usersModel: IUserModel = new UsersModel(),
  ) { }

  async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.usersModel.login(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ id: user.id, role: user.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
