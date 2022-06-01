import { Connection } from "mysql2";
import { Team, HistoryTeam } from "../model/Team";
import { ITeamsRepo } from "./ITeamsRepo";
import { ConnParams } from "../types/ConnParams";
import { ValidationResult } from "../types/Validation";
import { validateTeam } from "./validateTeam";
import { buildMySQLConn, TEAMS_TABLE, TEAM_PLAYER_TABLE, HISTORY_TABLE, coerceDate } from "./common";

export class MySQLTeamsRepo implements ITeamsRepo {
  conn: Connection;

  constructor(connParams: ConnParams) {
    this.conn = buildMySQLConn(connParams);
  }

  async getTeam(id: number) {
    const teamsQuery: string = `SELECT * FROM ${TEAMS_TABLE} WHERE id = ${id};`;
    const playersQuery: string = `SELECT * FROM ${TEAM_PLAYER_TABLE} WHERE teamid = ${id};`;

    const [team, ] = await this.conn.promise().query(teamsQuery) as any;
    const [player, ] = await this.conn.promise().query(playersQuery) as any;

    if (!team.length || !player.length) {
      return null;
    }

    return new Team(
      team[0].id,
      team[0].owner,
      team[0].description,
      team[0].name,
      (player as { playerid: number }[]).map(x => x.playerid)
    );
  }

  async getTeams(limit?: number) {
    const teamsQuery: string = `SELECT * FROM ${TEAMS_TABLE};`;
    const playersQuery: string = `SELECT * FROM ${TEAM_PLAYER_TABLE};`;

    const [teamsRes, ] = await this.conn.promise().query(teamsQuery) as any;
    const [playerRes, ] = await this.conn.promise().query(playersQuery) as any;

    if (!teamsRes.length || !playerRes) {
      return null;
    }

    const teams: Team[] = teamsRes.map((t: Team) =>
      new Team(
        t.id,
        t.owner,
        t.description,
        t.name,
        (playerRes as {teamid: number, playerid: number}[]).filter(x => x.teamid === t.id).map(x => x.playerid)));

    return limit
      ? teams.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
      : teams;
  }

  async delTeam(id: number) {
    const query: string = `DELETE FROM ${TEAMS_TABLE} WHERE id = ${id};`;
    const [qres, ] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async addTeam(team: Team) {
    const { ok }: ValidationResult = validateTeam(team);

    if (!ok) {
      return false;
    }

    const query: string = `INSERT INTO ${TEAMS_TABLE} (name, description, owner) VALUES \
          ('${team.name}', '${team.description}', '${team.owner}');`;
    const [qres, ] = await this.conn.promise().query(query) as any;

    return qres.length ? true : false;
  }

  async getPlayerTeams(id: number, limit?: number) {
    const query: string = `SELECT id, owner, description, name FROM ${TEAM_PLAYER_TABLE} tp \
      JOIN ${TEAMS_TABLE} p ON p.id = tp.teamid WHERE playerid = ${id}`;

    const [res, ] = await this.conn.promise().query(query) as any;
    if (!res.length) {
      return null;
    }

    const teams: Team[] = res.map((t: Team) =>
      new Team(
        t.id,
        t.owner,
        t.description,
        t.name,
        []
      ));

    return limit
      ? teams.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
      : teams;
  }

  async getPlayerHistory(id: number) {
    const query: string = `SELECT t.id, description, name, leaved FROM ${HISTORY_TABLE} h \
      JOIN ${TEAMS_TABLE} t ON t.id = h.teamid WHERE playerid = ${id} ORDER BY leaved`;

    const [res, ] = await this.conn.promise().query(query) as any;
    if (!res.length) {
      return null;
    }

    return res.map((t: HistoryTeam) =>
      new HistoryTeam(
        t.id,
        t.owner,
        t.description,
        t.name,
        [],
        coerceDate(t.leaved)
      ));
  }
}
