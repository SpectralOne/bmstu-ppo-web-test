import { IUsersRepo } from "../db/IUsersRepo";
import { User } from "../model/User";

export class UsersController {
  IUsersRepo: IUsersRepo;

  constructor(IUsersRepo: IUsersRepo) {
    this.IUsersRepo = IUsersRepo;
  }

  async addUser(user: User) {
    return await this.IUsersRepo.addUser(user);
  }

  async getUserId(login: string, password: string) {
    return await this.IUsersRepo.getUserId(login, password);
  }

  async getUser(id: number) {
    return await this.IUsersRepo.getUser(id);
  }
}
