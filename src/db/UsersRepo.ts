import { Pool } from "pg";
import { IUsersRepo } from "../db/IUsersRepo";
import { ConnParams } from "../types/ConnParams";
import { buildConn, executeQuery, USERS_TABLE } from "./common";
import { validateUser } from "./validateUser";
import { User } from "../model/User";

export class UsersRepo implements IUsersRepo {
  conn: Pool;

  constructor(connParams: ConnParams) {
    this.conn = buildConn(connParams);
  }

  async userExists(login: string) {
    const query = `SELECT * FROM ${USERS_TABLE} where login = '${login}';`;
    const queryRes = await executeQuery(query, this.conn);

    if (queryRes && queryRes.rows.length === 0) {
      return false;
    }

    return true;
  }

  async addUser(user: User) {
    const { ok, errors } = validateUser(user);

    if (!ok) {
      return false;
    }

    const userExists = await this.userExists(user.login);

    if (userExists) {
      return false;
    }

    const query = `INSERT INTO ${USERS_TABLE} (login, password, privelegelevel) VALUES \
    ('${user.login}', '${user.password}', '${user.privelegelevel}');`;

    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async getUserByLogin(login: string, password: string) {
    const userExists = await this.userExists(login);

    if (!userExists) {
      return null;
    }

    const query = `SELECT * FROM ${USERS_TABLE} WHERE login = '${login}' AND password = '${password}';`;
    const res = await executeQuery(query, this.conn);
    return res
      ? new User(res.rows[0].id, res.rows[0].login, "", res.rows[0].privelegelevel)
      : null;
  }
}
