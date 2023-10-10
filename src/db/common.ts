import { Pool } from "pg";
import { createConnection, Connection } from "mysql2";
import { ConnParams } from "../types/ConnParams";

export const PLAYERS_TABLE = "players";
export const TEAM_PLAYER_TABLE = "teamplayer";
export const TEAMS_TABLE = "teams";
export const USERS_TABLE = "users";
export const HISTORY_TABLE = "history";

export const executeQuery = async (q: string, conn: Pool) => {
  try {
    return await conn.query(q);
  } catch (err) {
    console.log("db err: ", err)
    return null;
  }
}

export const coerceDate = (date: Date) => {
  if (date.getTimezoneOffset() !== 0)
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return date;
}

export const buildConn = (connParams: ConnParams) => {
  return new Pool(connParams);
}

export const buildMySQLConn = (connParams: ConnParams) => {
  return createConnection(connParams)
}
