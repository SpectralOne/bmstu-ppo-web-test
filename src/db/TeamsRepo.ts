import { Pool } from "pg";
import { Team, HistoryTeam } from "../model/Team";
import { ITeamsRepo } from "./ITeamsRepo";
import { ConnParams } from "../types/ConnParams";
import { ValidationResult } from "../types/Validation";
import { validateTeam } from "./validateTeam";
import { buildConn, executeQuery, TEAMS_TABLE, TEAM_PLAYER_TABLE, HISTORY_TABLE, coerceDate } from "./common";

export class TeamsRepo implements ITeamsRepo {
  conn: Pool;

  constructor(connParams: ConnParams) {
    this.conn = buildConn(connParams);
  }

  async getTeam(id: number) {
    const teamsQuery: string = `SELECT * FROM ${TEAMS_TABLE} WHERE id = ${id};`;
    const playersQuery: string = `SELECT * FROM ${TEAM_PLAYER_TABLE} WHERE teamid = ${id};`;

    const team = await executeQuery(teamsQuery, this.conn);
    const player = await executeQuery(playersQuery, this.conn);

    if (!team || !player) {
      return null;
    }

    return new Team(
      team.rows[0].id,
      team.rows[0].owner,
      team.rows[0].description,
      team.rows[0].name,
      player.rows.map(x => x.playerid)
    );
  }

  async getTeams(limit?: number) {
    const teamsQuery: string = `SELECT * FROM ${TEAMS_TABLE};`;
    const playersQuery: string = `SELECT * FROM ${TEAM_PLAYER_TABLE};`;

    const teamsRes = await executeQuery(teamsQuery, this.conn);
    const playerRes = await executeQuery(playersQuery, this.conn);

    if (!teamsRes || !playerRes) {
      return null;
    }

    const teams = teamsRes.rows.map((t: Team) =>
      new Team(
        t.id,
        t.owner,
        t.description,
        t.name,
        playerRes.rows.filter(x => x.teamid === t.id).map(x => x.playerid)));

    return limit
      ? teams.sort((c, n) => c.id > n.id ? -1 : 1).slice(0, limit)
      : teams;
  }

  async delTeam(id: number) {
    const query: string = `DELETE FROM ${TEAMS_TABLE} WHERE id = ${id};`;
    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async addTeam(team: Team) {
    const { ok }: ValidationResult = validateTeam(team);

    if (!ok) {
      return false;
    }

    const query: string = `INSERT INTO ${TEAMS_TABLE} (name, description, owner) VALUES \
          ('${team.name}', '${team.description}', '${team.owner}');`;
    const qres = await executeQuery(query, this.conn);

    return qres ? true : false;
  }

  async getPlayerTeams(id: number, limit?: number) {
    const query: string = `SELECT id, owner, description, name FROM ${TEAM_PLAYER_TABLE} tp \
      JOIN ${TEAMS_TABLE} p ON p.id = tp.teamid WHERE playerid = ${id}`;

    const res = await executeQuery(query, this.conn);
    if (!res?.rows.length) {
      return null;
    }

    const teams = res.rows.map((t: Team) =>
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

    const res = await executeQuery(query, this.conn);
    if (!res?.rows.length) {
      return null;
    }

    return res.rows.map((t: HistoryTeam) =>
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
