import { Pool } from "pg";
import { q, buildConn } from "./utils";
import { Team } from "../model/Team";
import { ConnParams } from "../types/ConnParams";

class PgTeamsRepo {
  async addTeam(_team: Team, _conn: Pool): Promise<any> { }
  async delTeam(_id: number, _conn: Pool): Promise<any> { }
}

const TABLE = "teams";

export class ITeamsRepo extends PgTeamsRepo {
  conn: Pool;

  constructor(connParams: ConnParams) {
    super();
    this.conn = buildConn(connParams);
  }

  async delTeam(id: number) {
    const query: string = `DELETE FROM ${TABLE} WHERE id = ${id};`;
    return q(query, this.conn)
  }

  async addTeam(team: Team) {
    const query: string = `INSERT INTO ${TABLE} (name, description, owner) VALUES \
          ('${team.name}', '${team.description}', '${team.owner}');`;
    return q(query, this.conn);
  }
}
