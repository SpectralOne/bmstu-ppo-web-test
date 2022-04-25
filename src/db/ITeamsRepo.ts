import { Pool } from "pg";
import { q } from "./utils";
import { Team } from "../model/Team";

class PgTeamsRepo {
  async addTeam(_team: Team, _conn: Pool): Promise<any> { }
  async delTeam(_id: number, _conn: Pool): Promise<any> { }
}

const TABLE = "teams";

export class ITeamsRepo extends PgTeamsRepo {
  async delTeam(id: number, conn: Pool) {
    const query: string = `DELETE FROM ${TABLE} WHERE id = ${id};`;
    return q(query, conn)
  }

  async addTeam(team: Team, conn: Pool) {
    const query: string = `INSERT INTO ${TABLE} (name, description, owner) VALUES \
          ('${team.name}', '${team.description}', '${team.owner}');`;
    return q(query, conn);
  }
}
