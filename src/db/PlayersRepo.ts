import { Pool } from "pg";
import { Player } from "../model/Player";
import { ConnParams } from "../types/ConnParams";
import { ValidationResult } from "../types/Validation";
import { validatePlayer } from "./validatePlayer";
import { IPlayersRepo } from "./IPlayersRepo";
import { buildConn, coerceDate, executeQuery, PLAYERS_TABLE, TEAM_PLAYER_TABLE } from "./common";

export class PlayersRepo implements IPlayersRepo {
  conn: Pool;

  constructor(connParams: ConnParams) {
    this.conn = buildConn(connParams);
  }

  async delPlayer(id: number) {
    const query: string = `DELETE FROM ${PLAYERS_TABLE} WHERE id = ${id}`;
    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async addPlayer(player: Player) {
    const { ok }: ValidationResult = validatePlayer(player);

    if (!ok) {
      return false;
    }

    const { firstname, lastname, country, birthdate, owner }: Player = player;

    const bd = birthdate.toISOString();

    const query = `INSERT INTO ${PLAYERS_TABLE} (firstname, lastname, country, birthdate, owner) \ 
      VALUES ('${firstname}', '${lastname}', '${country}', '${bd}', ${owner});`;

    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async getPlayers(limit?: number) {
    const playersQuery = `SELECT * FROM ${PLAYERS_TABLE};`;
    const teamsQuery = `select * from ${TEAM_PLAYER_TABLE};`;
    const playersRes = await executeQuery(playersQuery, this.conn);
    const teamsRes = await executeQuery(teamsQuery, this.conn);

    if (!playersRes || !teamsRes)
      return null;

    const players = playersRes.rows.map((p: Player) =>
      new Player(
        p.id,
        p.owner,
        p.firstname,
        p.lastname,
        p.country,
        coerceDate(p.birthdate),
        teamsRes.rows.filter(x => x.playerid === p.id).map(x => x.teamid)));
    return limit
      ? players.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
      : players;
  }

  async getPlayer(playerId: number) {
    const playerQuery = `SELECT * FROM ${PLAYERS_TABLE} where id = ${playerId};`;
    const teamsQuery = `select * from ${TEAM_PLAYER_TABLE} where playerid = ${playerId};`;

    const player = await executeQuery(playerQuery, this.conn);
    const teams = await executeQuery(teamsQuery, this.conn);
    if (!player || !teams)
      return null;

    return new Player(
      player.rows[0].id,
      player.rows[0].owner,
      player.rows[0].firstname,
      player.rows[0].lastname,
      player.rows[0].country,
      coerceDate(player.rows[0].birthdate),
      teams.rows.map(x => x.teamid))
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    const query = `INSERT INTO ${TEAM_PLAYER_TABLE} (teamid, playerid) VALUES \
              ('${teamId}', '${playerId}');`;
    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    const query = `DELETE FROM ${TEAM_PLAYER_TABLE} WHERE \
      teamid = '${teamId}' AND playerid = '${playerId}';`;
    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }
}
