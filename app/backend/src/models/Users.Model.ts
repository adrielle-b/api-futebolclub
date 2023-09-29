import IUserModel from '../Interfaces/UsersModel';
import SequelizeUsers from '../database/models/SequelizeUsers';
import IUser from '../Interfaces/Users';

export default class UsersModel implements IUserModel {
  private model = SequelizeUsers;

  async login(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user.toJSON();
  }
}
