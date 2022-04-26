import { Pool } from "pg";
import { ITeamsRepo } from "../db/ITeamsRepo";
import { Team } from "../model/Team";

export class TeamsController {
  ITeamsRepo: ITeamsRepo;

  constructor(ITeamsRepo: ITeamsRepo) {
    this.ITeamsRepo = ITeamsRepo;
  }

  async delTeam(id: number) {
    return await this.ITeamsRepo.delTeam(id);
  }

  async addTeam(team: Team) {
    return await this.ITeamsRepo.addTeam(team);
  }
}
