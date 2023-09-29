import IUser from './Users';

export default interface IUserModel{
  login(email: IUser['email']): Promise<IUser | null>
}
