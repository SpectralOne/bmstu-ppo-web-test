import { User } from "../model/User";

export interface IUsersRepo {
  addUser(user: User): Promise<boolean>;
  getUserByLogin(login: string, password: string): Promise<User | null>;
  userExists(login: string): Promise<boolean>;
}
