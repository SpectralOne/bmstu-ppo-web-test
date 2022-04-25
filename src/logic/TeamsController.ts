import { Pool } from "pg";
import { ITeamsRepo } from "../db/ITeamsRepo";
import { Team } from "../model/Team";
import { buildConn } from "../db/utils";

export class TeamsController extends ITeamsRepo {
  conn: Pool;
  ITeamsRepo: ITeamsRepo;

  constructor(connParams: any) {
    super();
    this.conn = buildConn(connParams);
    this.ITeamsRepo = new ITeamsRepo;
  }

  async delTeam(id: number) {
    return await this.ITeamsRepo.delTeam(id, this.conn);
  }

  async addTeam(team: Team) {
    return await this.ITeamsRepo.addTeam(team, this.conn);
  }
}
