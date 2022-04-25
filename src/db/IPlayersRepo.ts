import { Pool } from "pg";
import { q, coerceDate } from "./utils";
import { Player } from "../model/Player";

class PgPlayersRepo {
  async addPlayer(_player: Player, _conn: Pool): Promise<any> { }
  async getPlayers(_conn: Pool): Promise<any> { }
  async delPlayer(_id: number, _conn: Pool): Promise<any> { }
  async addPlayerTeam(_playerId: number, _teamId: number, _conn: Pool): Promise<any> { }
  async delPlayerTeam(_playerId: number, _teamId: number, _conn: Pool): Promise<any> { }
}

const TABLE = "players";
const TEAM_PLAYER_TABLE = "teamplayer";

export class IPlayersRepo extends PgPlayersRepo {
  async delPlayer(id: number, conn: Pool) {
    const query: string = `DELETE FROM ${TABLE} WHERE id = ${id}`;
    return q(query, conn);
  }

  async addPlayer(player: Player, conn: Pool) {
    const bd = player.birthdate.toISOString();
    const query = `INSERT INTO ${TABLE} (firstname, lastname, country, birthdate, owner) VALUES \
        ('${player.firstname}', '${player.lastname}', '${player.country}', '${bd}', ${player.owner});`;
    return q(query, conn);
  }

  async getPlayers(conn: Pool) {
    const query = `SELECT * FROM ${TABLE};`;
    const res = await q(query, conn);
    if (!res)
      return null;
    return res.rows.map((p: Player | any) => new Player(p.id, p.owner, p.firstname, p.lastname, p.country, coerceDate(p.birthdate)));
  }

  async addPlayerTeam(playerId: number, teamId: number, conn: Pool) {
    const query = `INSERT INTO ${TEAM_PLAYER_TABLE} (team_id, player_id) VALUES \
            ('${teamId}', '${playerId}');`;
    return q(query, conn);
  }

  async delPlayerTeam(playerId: number, teamId: number, conn: Pool) {
    const query = `DELETE FROM ${TEAM_PLAYER_TABLE} WHERE team_id = '${teamId}' AND \
            player_id = '${playerId}';`;
    return q(query, conn);
  }
}
