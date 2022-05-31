import { Connection } from "mysql2";

import { Player } from "../model/Player";
import { ConnParams } from "../types/ConnParams";
import { ValidationResult } from "../types/Validation";
import { validatePlayer } from "./validatePlayer";
import { IPlayersRepo } from "./IPlayersRepo";
import { buildMySQLConn, coerceDate, PLAYERS_TABLE, TEAM_PLAYER_TABLE, HISTORY_TABLE } from "./common";

export class MySQLPlayersRepo implements IPlayersRepo {
  conn: Connection;

  constructor(connParams: ConnParams) {
    this.conn = buildMySQLConn(connParams);
  }

  async delPlayer(id: number) {
    const query: string = `DELETE FROM ${PLAYERS_TABLE} WHERE id = ${id}`;
    const [qres,] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async addPlayer(player: Player) {
    const { ok }: ValidationResult = validatePlayer(player);

    if (!ok) {
      return false;
    }

    const { firstname, lastname, country, birthdate, owner }: Player = player;

    const date: Date = new Date(birthdate.toISOString());
    const bd = date.toJSON().slice(0, 19).replace('T', ' ');

    const query = `INSERT INTO ${PLAYERS_TABLE} (firstname, lastname, country, birthdate, owner) \
      VALUES ('${firstname}', '${lastname}', '${country}', '${bd}', ${owner});`;

    const [qres,] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async getPlayers(limit?: number) {
    const playersQuery = `SELECT * FROM ${PLAYERS_TABLE};`;
    const teamsQuery = `select * from ${TEAM_PLAYER_TABLE};`;
    const [playersRes,] = await this.conn.promise().query(playersQuery) as any;
    const [teamsRes,] = await this.conn.promise().query(teamsQuery) as any;

    if (!playersRes.length || !teamsRes)
      return null;

    const players: Player[] = playersRes.map((p: Player) =>
      new Player(
        p.id,
        p.owner,
        p.firstname,
        p.lastname,
        p.country,
        coerceDate(p.birthdate),
        (teamsRes as { playerid: number, teamid: number }[]).filter(x => x.playerid === p.id).map(x => x.teamid)));
    return limit
      ? players.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
      : players;
  }

  async getPlayer(playerId: number) {
    const playerQuery = `SELECT * FROM ${PLAYERS_TABLE} where id = ${playerId};`;
    const teamsQuery = `select * from ${TEAM_PLAYER_TABLE} where playerid = ${playerId};`;

    const [player,] = await this.conn.promise().query(playerQuery) as any;
    const [teams,] = await this.conn.promise().query(teamsQuery) as any;
    if (!player.length || !teams.length)
      return null;

    return new Player(
      player[0].id,
      player[0].owner,
      player[0].firstname,
      player[0].lastname,
      player[0].country,
      coerceDate(player[0].birthdate),
      (teams as { teamid: number }[]).map(x => x.teamid))
  }

  async addPlayerTeam(playerId: number, teamId: number) {
    const query = `INSERT INTO ${TEAM_PLAYER_TABLE} (teamid, playerid) VALUES \
              ('${teamId}', '${playerId}');`;

    const [qres,] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async delPlayerTeam(playerId: number, teamId: number) {
    const query = `DELETE FROM ${TEAM_PLAYER_TABLE} WHERE \
      teamid = '${teamId}' AND playerid = '${playerId}';`;

    const date: Date = new Date()
    const currentDate = new Date(date.toISOString()).toJSON().slice(0, 19).replace('T', ' ');

    const historyQuery = `INSERT INTO ${HISTORY_TABLE} (playerid, teamid, leaved) VALUES \
                ('${playerId}', '${teamId}', '${currentDate}');`;

    const [qres,] = await this.conn.promise().query(query) as any;
    const [historyQres,] = await this.conn.promise().query(historyQuery) as any;

    return qres.length && historyQres.length ? true : false;
  }
}
