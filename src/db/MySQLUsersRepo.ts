import { Connection } from "mysql2";
import { IUsersRepo } from "./IUsersRepo";
import { ConnParams } from "../types/ConnParams";
import { buildMySQLConn, USERS_TABLE } from "./common";
import { validateUser } from "./validateUser";
import { User } from "../model/User";

export class MySQLUsersRepo implements IUsersRepo {
  conn: Connection;

  constructor(connParams: ConnParams) {
    this.conn = buildMySQLConn(connParams);
  }

  async userExists(login: string) {
    const query = `SELECT * FROM ${USERS_TABLE} where login = '${login}';`;
    const [queryRes,] = await this.conn.promise().query(query) as any;

    if (queryRes.length) {
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

    const [qres,] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async getUserByLogin(login: string) {
    const userExists = this.userExists(login);

    if (!userExists) {
      return null;
    }

    const query = `SELECT * FROM ${USERS_TABLE} WHERE login = '${login}';`;
    const [res,] = await this.conn.promise().query(query) as any;

    return res.length
      ? new User(res[0].id, res[0].login, res[0].password, res[0].privelegelevel)
      : null;
  }
}
