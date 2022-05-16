import { IUsersRepo } from "../db/IUsersRepo";
import { User } from "../model/User";

export class UsersController {
  UsersRepo: IUsersRepo;

  constructor(UsersRepo: IUsersRepo) {
    this.UsersRepo = UsersRepo;
  }

  async addUser(user: User) {
    return await this.UsersRepo.addUser(user);
  }

  async getUserByLogin(login: string, password: string) {
    return await this.UsersRepo.getUserByLogin(login, password);
  }

  async userExists(login: string) {
    return await this.UsersRepo.userExists(login);
  }
}
