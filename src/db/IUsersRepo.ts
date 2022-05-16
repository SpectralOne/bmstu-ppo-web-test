import { User } from "../model/User";

interface PgUsersRepo {
  getUserByLogin(_login: string, _password: string, _conn: any): Promise<any>;
  addUser(_user: User, _conn: any): Promise<any>;
  userExists(_login: string, _conn: any): Promise<any>;
}

export interface IUsersRepo extends PgUsersRepo {
  addUser(user: User): Promise<boolean>;
  getUserByLogin(login: string, password: string): Promise<User | null>;
  userExists(login: string): Promise<boolean>;
}
