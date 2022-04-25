import { Pool } from "pg";
import { IUsersRepo } from "../db/IUsersRepo";
import { User } from "../model/User";
import { buildConn } from "../db/utils";

export class UsersController extends IUsersRepo {
  conn: Pool;
  IUsersRepo: IUsersRepo;

  constructor(connParams: any) {
    super();
    this.conn = buildConn(connParams);
    this.IUsersRepo = new IUsersRepo;
  }

  async addUser(user: User) {
    return await this.IUsersRepo.addUser(user, this.conn);
  }

  async getUserId(login: string, password: string) {
    return await this.IUsersRepo.getUserId(login, password, this.conn);
  }

  async getUser(id: number) {
    return await this.IUsersRepo.getUser(id, this.conn);
  }
}
