import { Pool } from "pg";
import { q, buildConn } from "./utils";
import { User } from "../model/User";
import { ConnParams } from "../types/ConnParams";

class PgUsersRepo {
  async getUserId(_login: string, _password: string, _conn: Pool): Promise<any> { }
  async getUser(_id: number, _conn: Pool): Promise<any> { }
  async addUser(_user: User, _conn: Pool): Promise<any> { }
}

const TABLE = "users";

export class IUsersRepo extends PgUsersRepo {
  conn: Pool;

  constructor(connParams: ConnParams) {
    super();
    this.conn = buildConn(connParams);
  }

  async addUser(user: User) {
    const query = `INSERT INTO ${TABLE} (login, password, privelegelevel) VALUES \
             ('${user.login}', '${user.password}', '${user.privelegelevel}');`;
    return q(query, this.conn);
  }

  async getUserId(login: string, password: string) {
    const query = `SELECT id FROM ${TABLE} WHERE login = '${login}' AND password = '${password}';`;
    const res = await q(query, this.conn);
    return res ? res.rows[0].id : null;
  }

  async getUser(id: number) {
    const query = `SELECT * FROM ${TABLE} WHERE id = ${id};`;
    const res = await q(query, this.conn);
    if (!res) {
      return null;
    }
    const { login, password, privelegelevel } = res.rows[0];
    return new User(id, login, password, privelegelevel);
  }
}
