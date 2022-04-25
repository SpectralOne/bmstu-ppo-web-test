import { Pool } from "pg";
import { q } from "./utils";
import { User } from "../model/User";

class PgUsersRepo {
  async getUserId(_login: string, _password: string, _conn: Pool): Promise<any> { }
  async getUser(_id: number, _conn: Pool): Promise<any> { }
  async addUser(_user: User, _conn: Pool): Promise<any> { }
}

const TABLE = "users";

export class IUsersRepo extends PgUsersRepo {
  async addUser(user: User, conn: Pool) {
    const query = `INSERT INTO ${TABLE} (login, password, privelegeLevel) VALUES \
             ('${user.login}', '${user.password}', '${user.privelegeLevel}');`;
    return q(query, conn);
  }

  async getUserId(login: string, password: string, conn: Pool) {
    const query = `SELECT id FROM ${TABLE} WHERE login = '${login}' AND password = '${password}';`;
    const res = await q(query, conn);
    return res ? res.rows[0].id : null;
  }

  async getUser(id: number, conn: Pool) {
    const query = `SELECT * FROM ${TABLE} WHERE id = ${id};`;
    const res = await q(query, conn);
    if (!res) {
      return null;
    }
    const { login, password, privelegelevel } = res.rows[0];
    return new User(id, login, password, privelegelevel);
  }
}
