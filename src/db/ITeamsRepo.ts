import { Team } from "../model/Team";

export interface ITeamsRepo {
  getTeam(id: number): Promise<Team | null>;
  getTeams(limit?: number): Promise<Team[] | null>;
  getPlayerTeams(id: number, limit?: number): Promise<Team[] | null>;
  delTeam(id: number): Promise<boolean>;
  addTeam(team: Team): Promise<boolean>;
}
