import { Pool } from "pg";
import { q, coerceDate, buildConn } from "./utils";
import { Player } from "../model/Player";
import { ConnParams } from "../types/ConnParams";

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
  conn: Pool;

  constructor(connParams: ConnParams) {
    super();
    this.conn = buildConn(connParams);
  }

  async delPlayer(id: number) {
    const query: string = `DELETE FROM ${TABLE} WHERE id = ${id}`;
    return q(query, this.conn);
  }

  async addPlayer(player: Player) {
    const bd = player.birthdate.toISOString();
    const query = `INSERT INTO ${TABLE} (firstname, lastname, country, birthdate, owner) VALUES \
        ('${player.firstname}', '${player.lastname}', '${player.country}', '${bd}', ${player.owner});`;
    return q(query, this.conn);
  }

  async getPlayers() {
    const query = `SELECT * FROM ${TABLE};`;
    const res = await q(query, this.conn);
    if (!res)
      return null;
    return res.rows.map((p: Player) => new Player(p.id, p.owner, p.firstname, p.lastname, p.country, coerceDate(p.birthdate)));
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    const query = `INSERT INTO ${TEAM_PLAYER_TABLE} (team_id, player_id) VALUES \
            ('${teamId}', '${playerId}');`;
    return q(query, this.conn);
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    const query = `DELETE FROM ${TEAM_PLAYER_TABLE} WHERE team_id = '${teamId}' AND \
            player_id = '${playerId}';`;
    return q(query, this.conn);
  }
}
