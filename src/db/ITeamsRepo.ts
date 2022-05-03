import { Team } from "../model/Team";

interface PgTeamsRepo {
  getTeams(_limit: number | null, _conn: any): Promise<any>;
  getPlayerTeams(_id: number, _limit: number | null, _conn: any): Promise<any>;
  getTeam(_id: number, _conn: any): Promise<any>;
  addTeam(_team: Team, _conn: any): Promise<any>;
  delTeam(_id: number, _conn: any): Promise<any>;
}

export interface ITeamsRepo extends PgTeamsRepo {
  getTeam(id: number): Promise<Team | null>;
  getTeams(limit: number | null): Promise<Team[] | null>;
  getPlayerTeams(id: number, limit: number | null): Promise<Team[] | null>;
  delTeam(id: number): Promise<boolean>;
  addTeam(team: Team): Promise<boolean>;
}
