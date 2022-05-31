import { ITeamsRepo } from "../db/ITeamsRepo";
import { Team } from "../model/Team";

export class TeamsController {
  TeamsRepo: ITeamsRepo;

  constructor(TeamsRepo: ITeamsRepo) {
    this.TeamsRepo = TeamsRepo;
  }

  async delTeam(id: number) {
    return await this.TeamsRepo.delTeam(id);
  }

  async addTeam(team: Team) {
    return await this.TeamsRepo.addTeam(team);
  }

  async getTeam(id: number) {
    return await this.TeamsRepo.getTeam(id);
  }

  async getTeams(limit?: number) {
    return await this.TeamsRepo.getTeams(limit);
  }

  async getPlayerTeams(id: number, limit?: number) {
    return await this.TeamsRepo.getPlayerTeams(id, limit);
  }

  async getPlayerHistory(id: number) {
    return await this.TeamsRepo.getPlayerHistory(id);
  }
}
